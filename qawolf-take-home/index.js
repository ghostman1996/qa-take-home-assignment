const { chromium } = require("playwright");

(async () => {
 const browser = await chromium.launch({
  headless: false,
 });

 const context = await browser.newContext();

 // Open new page
 const page = await context.newPage();

 // Go to https://www.netflix.com/
 await page.goto("https://www.netflix.com/");

 // Checking to see if the page has h1 with text Unlimited movies, TV shows, and more
 await page.waitForSelector("text=Unlimited movies, TV shows, and more", [
  { visible: true },
 ]);

 // Checking if you can switch the language to Español
 await Promise.all([
  page.waitForNavigation({ url: "https://www.netflix.com/us-es/" }),
  page
   .locator("text=NetflixSelect LanguageEnglishEspañolSign In >> select")
   .selectOption("/us-es/"),
 ]);

 // Checking if you can switch the language to English
 await Promise.all([
  page.waitForNavigation({ url: "https://www.netflix.com/" }),
  page
   .locator(
    "text=NetflixSelecciona el idiomaEnglishEspañolIniciar sesión >> select",
   )
   .selectOption("/"),
 ]);

 // Click a:has-text("Sign In")
 await page.locator('a:has-text("Sign In")').click();

 // Checking to see if the Sign In block is visible
 await page.waitForSelector("text=Sign In", [{ visible: true }]);


 // Fill input[name="userLoginId"]
 await page.locator('input[name="userLoginId"]').fill("mina@mina.com");


 // Fill input[name="password"]
 await page.locator('input[name="password"]').fill("mina");

 // Click button:has-text("Sign In")
 await Promise.all([
  page.waitForNavigation({ url: "https://www.netflix.com/login" }),
  page.locator('button:has-text("Sign In")').click(),
  page.waitForSelector(".ui-message-contents", ["visable"]),
 ]);

 // Clicking on the Netflix logo to go back to the home page
 await Promise.all([
  await page.locator("#appMountPoint svg").click(),
  page.waitForSelector("text=Unlimited movies, TV shows, and more.", [
   "visable",
  ]),
 ]);

 // ---------------------
 await context.close();
 await browser.close();
})();
