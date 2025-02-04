import { Page, expect } from '@playwright/test';

export class NavbarNavigator {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Selects an application from the sidebar.
     * @param appName The name of the application ("Web Application", "Mobile Application", "Marketing Campaign")
     */
    async selectApplication(appName: string): Promise<void> {
        const appButton = this.page.locator(`button:has(h2:has-text("${appName}"))`);

        // does the button exists before clicking
        expect(await appButton.count(), `X Application button "${appName}" was not found.`).toBeGreaterThan(0);

        await Promise.all([
            appButton.click(),
            this.page.waitForSelector(`h2:has-text("${appName}")`, { state: 'visible', timeout: 5000 })
        ]);

        // the application page has loaded successfully
        await expect(this.page.locator(`h2:has-text("${appName}")`)).toBeVisible({
            timeout: 5000
        });

        console.log(` Successfully navigated to "${appName}".`);
    }


}
