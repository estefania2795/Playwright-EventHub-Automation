const {test, expect} = require('@playwright/test');

 //Step 1 — Login
    const BASE_URL ="https://eventhub.rahulshettyacademy.com";
    const email ="beginner@sample.com";
    const password ="Banamex19#";

    async function login(page) {
    await page.goto(BASE_URL);
    }

    test('Smoke email and sign in button',async ({page})=>
    {
    
        // ── Step 1: Log in
        await page.goto(`${BASE_URL}/login`);  
        await expect(page).toHaveTitle(/EventHub/);
        await expect(page.getByLabel("Email")).toBeVisible({timeout: 10_000});
        await expect(page.locator("#login-btn")).toBeVisible({timeout: 10_000});

    })

    test('Fill email and ',async ({page})=>
    {
    
        // ── Step 1: Log in
        await page.goto(`${BASE_URL}/login`);
        await page.locator("#email").fill(email);
        await expect(page.locator("#email"))
        .toHaveValue("beginner@sample.com");

    })
    //the page fixture gives one ready-to-use page, a browser context is a separate session container, and a fresh context starts with isolated state.

    test('Create fresh isolate page',async ({browser})=>
    {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await expect(
        page.getByRole('heading', { name: 'Sign in to EventHub' })
    ).toBeVisible({ timeout: 10_000 });
    await expect(page.getByLabel("Email")).toHaveText("");
    await context.close();
    })