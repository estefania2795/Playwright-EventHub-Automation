//- test → used to define and organize test cases.
//- expect → used for assertions, to check that values or UI states match what you expect

const {test, expect} = require('@playwright/test');


test('First Playwright test',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    const createAC = page.locator(".text-reset");
    const firstName = page.locator("#firstName");
    const lastName = page.locator("#lastName");
    const email = page.locator("#userEmail");
    const mobile = page.locator("#userMobile");
    const password = page.locator("#userPassword");
    const confirmPassword = page.locator("#confirmPassword");
    const male = page.locator('input[value="Male"]');
    const older = page.locator('input[formcontrolname="required"]');
    const register = page.locator("#login");
    const login = page.locator(".btn-primary");
    const emailValue ="erodriguez11@gmail.com";
    const passValue ="Banamex19*";
    const loginButt = page.locator("#login");
    

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await createAC.click();
    await firstName.fill("Estefania");
    await lastName.fill("Rodriguez");
    await email.fill(emailValue);
    await mobile.fill("4772244386");
    await page.locator("[formcontrolname='occupation']").selectOption("2: Student");
    await page.locator(".custom-select").selectOption("2: Student");
    await male.check();
    await password.fill(passValue);
    await confirmPassword.fill(passValue);
    await older.check();
    await register.click();
    await login.click();
    await email.fill(emailValue);
    await password.fill(passValue);
    await loginButt.click();
    //this line is used to load all the articles trough the API in the page and wait to avoid issues with alltextcontext
    await page.waitForLoadState("networkidle");
    await page.waitFor(".card-body");
    //alltextcontents donesn't support automatic wait
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    await page.pause();

});

test('UI Controls',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    const userType = page.locator("input[value='user']");
    

    await userName.fill("rahulshettyacademy ");
    await password.fill("Learning@830$3mK2");
    //await userType.check();
    //how to handle static dropdown
    await page.locator("select.form-control").selectOption("consult");
    
    //how to handle web based popup
    
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();

    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    //ToBeFalsy Verify that the checkbox with the id terms is NOT checked
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
}); 
  
test('@Child window hadl',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    const documentLink = page.locator("[href*='documents-request']");

    //catch the new page
    const [newPage]=await Promise.all (//set of steps needs to be parallelly go an wait until these steps    
    [context.waitForEvent('page'),//listen for any new page pending, rejected , fulfilled
        documentLink.click(),

    ])//new page is opened
    
    const text=await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    
    console.log(await page.locator("#username").inputValue());

})

test('Client app login',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const login = page.locator("#login");
    const item = "ZARA COAT 3";
    const cart = page.locator(".btn-custom");
    const product = page.locator(".cartSection").locator("h3");
    const idProduct =page.locator(".cartSection").locator("p");
    const productAdded = page.locator(".item__title");
    const selectCountry = page.locator(".form-group")
    
    //login
    await userName.fill("visaadventures@gmail.com ");
    await password.fill("Banamex19");
    await login.click();


    await page.locator('.card')
    .filter({ hasText: item })
    .getByRole('button', { name: 'Add To Cart' })
    .click();
    

    await cart
    .filter({ hasText: 'Cart' })
    .click();

    //validation
    console.log(await expect(product).toHaveText(item));

    await page.locator(".btn-primary")
    .filter({ hasText: 'Checkout' })
    .click();

    //validation
    console.log(await expect(productAdded).toHaveText(item) );
    /*const cartCount = await page
    .getByRole('button', { name: /cart/i })
    .locator('label')
    .textContent();*/

    const text = await page.locator('.item__quantity').textContent();
    const newQuantity = text.split(':')[1].trim();;

    const cartCount = await page
    .locator('label', { hasText: /^\d+$/ })
    .textContent();

    //validation
    expect(cartCount).toBe(newQuantity);
    
    //validation
    const mail=await page.locator('.user__name').locator('label').textContent();


   
    const countryInput = page.getByPlaceholder('Select Country');

    // 1. Click
    await countryInput.click();

    // 2. Escribir (solo una vez)
    await countryInput.fill('Mexi');

    // 3. Esperar opción correctamente
    const option = page.locator('.list-group');

    // 4. Esperar visible (mejor que waitFor)
    //await expect(option).toBeVisible();

    // 5. Click
    await option.click();
    
    const expirySection = page.locator('div:has-text("Expiry Date")');

    await expirySection.locator('select').nth(0).click();
    await expirySection.locator('select').nth(0).selectOption('02'); // mes
    await expirySection.locator('select').nth(1).click();
    await expirySection.locator('select').nth(1).selectOption('18'); // año

    const cvv = page.locator('input.txt');
    await cvv.nth(1).fill('123');

    const nameOnCard = page
    .locator('.field')
    .filter({ hasText: 'Name on Card' })
    .locator('input');
    await nameOnCard.fill('John Doe');

    const coupon = page
    .locator('.field')
    .filter({ hasText: 'Apply Coupon' })
    .locator('input');
    await coupon.fill('rahulshettyacademy');

    const applyBtn = page.locator('.btn-primary');
    applyBtn.click();

    const couponMessage = page.locator('.field.small p');

    await expect(couponMessage).toContainText('* Coupon Applied', {
    timeout: 15000
    });

    await page.locator('.action__submit' ).click();

    await page.pause();

})