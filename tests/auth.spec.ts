import { test, chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from './page/LoginPage';
import { ProjectBoard } from './page/ProjectBoard';
import { NavbarNavigator } from './page/NavbarNavigator';
import testData from './data/projectBoardData.json';



let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async () => {
  browser = await chromium.launch({ headless: false });
});

test.afterAll(async () => {
  await browser.close();
});

//login before each test
test.beforeEach(async () => {
  context = await browser.newContext();
  page = await context.newPage();

  await page.goto(testData.url);
  await page.waitForSelector('#username', { state: 'visible', timeout: 30000 });

  const loginPage = new LoginPage(page);
  await loginPage.login(testData.credentials.email, testData.credentials.password);
});

// Run each test case
for (const data of testData.testCases) {
  test.describe(`${data.navigation} - ${data.task}`, () => {
    test(`Verify "${data.task}" in "${data.column}" with correct tags`, async () => {
      const navigator = new NavbarNavigator(page);
      await navigator.selectApplication(data.navigation);
      const dashboard = new ProjectBoard(page);
      try {
        await page.waitForLoadState('networkidle');
        await dashboard.verifyTaskInColumn(data.task, data.column);
        await page.waitForLoadState('networkidle');
        await dashboard.verifyTaskTags(data.column, data.task, data.tags);
      } catch (error) {
        console.error(`test Failed for "${data.task}":`, error);
        throw error;
      }
      console.log(`Test Passed: "${data.task}" verified successfully.`);
    });
  });
}

test.afterEach(async () => {
  await context.close();
});

