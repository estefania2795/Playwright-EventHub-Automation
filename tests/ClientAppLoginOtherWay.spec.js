const {test, expect} = require('@playwright/test');

test.only('Client app login',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const userName = page.getByPlaceholder("email@example.com");
    const password = page.getByPlaceholder("enter your passsword");
    const login = page.getByRole('button',{name:"Login"}).click();
    const item = "ZARA COAT 3";
    const cart = page.locator(".btn-custom");
    const product = page.locator(".cartSection").locator("h3");
    const idProduct =page.locator(".cartSection").locator("p");
    const productAdded = page.locator(".item__title");
    const selectCountry = page.locator(".form-group")
    const emailValue ="visaadventures@gmail.com";
    
    //login
    await userName.fill("visaadventures@gmail.com ");
    await password.fill("Banamex19");
    await login.click();
    await page.waitForLoadState('networkidle');
    //wait until the first element is displayed
    await page.locator(".card-body b").first().waitFor();
    const count = await page.locator(".card-body").count();

    for(let i=0;i<count;++i){
        const productName = await page.locator(".card-body").nth(i).locator("b").textContent();
        if(productName == "ZARA COAT 3" ){
            await page.locator(".card-body").nth(i).locator("text=' Add To Cart'").click();
            break;
        }
    }

    await page.locator("button[routerlink='/dashboard/cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text='Checkout'").click();
    await expect(page.locator(".item__title")).toHaveText("ZARA COAT 3");
    await expect(page.locator(".user__name label")).toHaveText(emailValue);
    const value= await page.locator(".user__name input").first().inputValue();
    expect(value).toBe(emailValue);
    

    await page.locator("input[placeholder='Select Country']").pressSequentially("ind", { delay: 150 }) 
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const optionsCount  = await dropdown.locator("button").count();
     for(let i=0;i<optionsCount;++i){
        const text =  await dropdown.locator("button").nth(i).textContent();
        if (text === " India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
     }

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
    const thanks = await page.locator(".hero-primary").textContent();
    expect(thanks).toBe(' Thankyou for the order. ');
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    await page.locator("label[routerlink='/dashboard/myorders']").click();

    await page.locator("tr th").first().waitFor();


    const countTable = await page.locator("tbody tr").count();

    for(let i=0;i<countTable;++i){
        const orderFound = await page.locator("tbody tr").nth(i).locator("th").textContent();
        if(orderId.includes(orderFound)){
            console.log("si enxxiste "+ orderFound)
            await page.locator("tbody tr").nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();



    await page.pause();
})