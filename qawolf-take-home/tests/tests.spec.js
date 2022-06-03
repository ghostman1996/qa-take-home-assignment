const { test, expect } = require("@playwright/test");

const username = "mina@mina.com";
const password = "mina";

test("Going to the netflix home page", async ({ page }) => {
 await page.goto("https://www.netflix.com/");
});

test("Checking if the page has text with Unlimited movies, TV shows, and more", async ({
 page,
}) => {
 await page.goto("https://www.netflix.com/");
 await page.waitForSelector("text=Unlimited movies, TV shows, and more", [
  { visible: true },
 ]);
});

test("Checking if you can switch the language to Español and the page h1 changes to Español and switch it back to English", async ({
 page,
}) => {
 await page.goto("https://www.netflix.com");

 await Promise.all([
  page.waitForNavigation({ url: "https://www.netflix.com/us-es/" }),
  page
   .locator("text=NetflixSelect LanguageEnglishEspañolSign In >> select")
   .selectOption("/us-es/"),
 ]);

 await page.waitForSelector("text=Películas y series ilimitadas y mucho más.", [
  { visible: true },
 ]);

 await Promise.all([
  page.waitForNavigation({ url: "https://www.netflix.com/" }),
  page
   .locator(
    "text=NetflixSelecciona el idiomaEnglishEspañolIniciar sesión >> select",
   )
   .selectOption("/"),
 ]);

 await page.waitForSelector("text=Unlimited movies, TV shows, and more", [
  { visible: true },
 ]);
});

test("Going to the Sign In page", async ({ page }) => {
 await page.goto("https://www.netflix.com/");
 await page.locator('a:has-text("Sign In")').click();
 await page.waitForSelector("text=Sign In", [{ visible: true }]);
});

test("Checking if the Sign In block is visible", async ({ page }) => {
 await page.goto("https://www.netflix.com/login");
 await page.waitForSelector("text=Sign In", [{ visible: true }]);
});

test("Filling out the Email and Password fields", async ({ page }) => {
 await page.goto("https://www.netflix.com");
 await page.locator('a:has-text("Sign In")').click();

 await page.locator('input[name="userLoginId"]').fill(username);
 await page.locator("input[name='password']").fill(password);

 await page.locator('button:has-text("Sign In")').click();
 const errorMessage = page.locator(".ui-message-contents");
 await expect(errorMessage).toBeVisible();
});

test("Clicking on the Netflix logo to go back to the home page from the login page", async ({
 page,
}) => {
 await page.goto("https://www.netflix.com/login");
 await page.locator("#appMountPoint svg").click();
 const pageURL = await page.url();
 await page.waitForSelector("text=Unlimited movies, TV shows, and more.", [
  { visible: true },
 ]);
 expect(pageURL).toBe("https://www.netflix.com/");
});

test("Clicking on the Frequently Asked Questions and checking if the answer is visable", async ({
 page,
}) => {
 await page.goto("https://www.netflix.com/");
 await page.locator("text=What is Netflix?").click();
 const element = page.locator(
  "text=Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
 );
 await expect(element).toBeVisible();
});
