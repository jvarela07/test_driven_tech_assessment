import { Page } from '@playwright/test';

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

        if (await appButton.count() === 0) {
            throw new Error(`Application "${appName}" not found.`);
        }
        
        await Promise.all([
            appButton.click(),
            this.page.waitForSelector(`h2:has-text("${appName}")`, { state: 'visible', timeout: 5000 })
        ]);
    }


}
