const {test, expect} = require('@playwright/test');


//test.only to test only one single test
//- async marks the function as asynchronous.
//- It allows you to use the keyword await inside the function

test('First Playwright test',async ({browser})=>
{
    //chrome - plugins/ cookies
    //open a new fresh browser without properties like cookies
    

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
     //css
     await userName.fill("learning");
     await password.fill("learning");
     await signIn.click();
     //option 1 with regular expression await page.locator("[style*='block']")

     console.log(await page.locator("[style='display: block;']").textContent());

     //assertions to containText
     await expect(page.locator("[style='display: block;']")).toContainText('Incorrect');
    //type - fill
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    //get the first element
    //console.log(await cardTitles.first().textContent());
    //console.log(await cardTitles.nth(0).textContent());
    //get all the elements
    const alltitles = await cardTitles.allTextContents();
    console.log(alltitles);
}

);

test('Page Playwright test', async ({page})=>
{
    await page.goto("https://google.com");
    //get title - assertion
    //print the title in the output
    console.log(await page.title());
   

    await expect(page).toHaveTitle("Google");

});

