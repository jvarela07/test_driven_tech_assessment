import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from './page/LoginPage';
import { ProjectBoard } from './page/ProjectBoard';
import { NavbarNavigator } from './page/NavbarNavigator';
import testData from './data/projectBoardData.json';
import { Helper } from '../util/helper';


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
      const helper = new Helper();
      const dashboard = new ProjectBoard(page);
      await helper.wait(2000);
      await dashboard.verifyTaskInColumn(data.task,data.column);
      await helper.wait(2000);
      await dashboard.verifyTaskTags(data.column, data.task, data.tags);

      //console.log(`Test Passed: "${data.task}" verified successfully.`);
    });
  });
}

test.afterEach(async () => {
  await context.close();
});

