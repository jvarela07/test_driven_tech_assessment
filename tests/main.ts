import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { LoginPage } from './page/LoginPage';
import { ProjectBoard } from './page/ProjectBoard';
import { NavbarNavigator } from './page/NavbarNavigator';
import testData from './data/projectBoardData.json';


async function runProjectBoardScenario(): Promise<void> {

    const browser: Browser = await chromium.launch({ headless: false });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();


    await page.goto(testData.url);
    await page.waitForSelector('#username', { state: 'visible', timeout: 30000 });

  
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.credentials.email, testData.credentials.password);

    for (const data of testData.testCases) {
    

        const navigator = new NavbarNavigator(page);
        await navigator.selectApplication(data.navigation);

  
        const dashboard = new ProjectBoard(page);
        await dashboard.verifyTaskInColumn(data.task, data.column);
        await dashboard.verifyTaskTags(data.column, data.task, data.tags);
  
        await wait(2000);

    }


    await browser.close();
}


async function wait(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
    });
}


runProjectBoardScenario().catch((error) => {
    console.error('Error running project board scenario:', error);
    process.exit(1);
});
