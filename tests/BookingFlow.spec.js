const {test, expect} = require('@playwright/test');



    //Step 1 — Login
    const BASE_URL ="https://eventhub.rahulshettyacademy.com";
    const email ="visaadventures@gmail.com";
    const password ="Banamex19#";
    

async function login(page) {
    await page.goto(BASE_URL);
    const userName = page.getByPlaceholder("you@email.com");
    await userName.fill(email);
    const pwd = page.getByLabel("Password");
    await pwd.fill(password);
    const loginBtn = page.locator("#login-btn");
    await loginBtn.click();
    const myEvent ="Birthday";
    await expect(page.getByText("Browse Events →")).toBeVisible({timeout: 10_000});
}

test('Full Booking Flow with Event Creation',async ({page})=>
{

    // ── Step 1: Log in
    await login(page);
    //Step 2 — Create a new event
    await page.goto(`${BASE_URL}/admin/events`);
    const myEvent = `Test Event ${Date.now()}`;
    
    await page.locator('#event-title-input').fill(myEvent);
    await page.locator("textarea").fill("This is my event description");
    await page.getByLabel("City").fill("Los Angeles");
    await page.getByLabel("Venue").fill("Demo ");
    await page.getByLabel("Event Date & Time").fill("2027-12-27T10:30");
    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("100");
    await page.locator('#add-event-btn').click();
    await expect(page.getByText("Event created!")).toBeVisible({timeout: 10_000});

    //Step 3 — Find the event card and capture seats
    await page.goto(`${BASE_URL}/events`);
    
    const cards= page.locator('[data-testid="event-card"]');
    await expect(cards.first()).toBeVisible({timeout: 10_000});
    const eventFound =  cards.filter({hasText:myEvent});
    await expect (eventFound).toBeVisible({timeout: 10_000});
    const seatsBeforeBooking =eventFound.getByText("SEATS");

    //Step 4 — Start booking
    await eventFound.getByTestId('book-now-btn').click();
    //Step 5 — Fill booking form
    await expect(page.locator('#ticket-count')).toHaveText("1");
    await page.getByLabel("Full Name").fill("Estefania RODRIGUEZ");
    await page.locator('#customer-email').fill("estef@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("9726252328");
    await page.locator('#confirm-booking').click();

    //Step 6 — Verify booking confirmation
    const reference=  page.locator(".booking-ref").first();
    await expect (reference).toBeVisible();
    const bookingRef = (await (reference).innerText()).trim();

    //Step 7 — Verify in My Bookings
    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);

    const allCards = page.locator("#booking-card");
    await expect(allCards.first()).toBeVisible();
    const cardFound =  allCards.filter({hasText:bookingRef});
    await expect(cardFound).toBeVisible();
    await expect(cardFound).toContainText(myEvent);

    //Step 8 — Verify seat reduction
    await page.locator('#nav-events').click();
    await expect( page.locator('#event-card').first()).toBeVisible();
    const eventSaved =  page.locator('#event-card').filter({hasText:myEvent});
    await expect(eventSaved).toBeVisible();
    const seatsAfterBookingText = await eventSaved.locator('.seats').innerText();
    const seatsAfterBooking = Number(seatsAfterBookingText);
    expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
    console.log(`Seats after booking: ${seatsAfterBooking}`);
    await page.pause();
})