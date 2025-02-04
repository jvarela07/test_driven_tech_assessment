import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly page: Page;
  private userNameSelector = '#username';
  private passwordSelector = '#password';
  private loginButton = 'button';

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async login(username: string, password: string): Promise<void> {
 
    await this.page.locator(this.userNameSelector).fill(username);
    await this.page.fill(this.passwordSelector, password);
    //click login button
    await this.clickAndWait(this.loginButton, 'domcontentloaded');
   
    //const dashboardHeader = this.page.locator('h1:has-text("Web Application")');
    //const isLoggedIn = await dashboardHeader.isVisible();

    //expect(isLoggedIn, ' Login failed: Dashboard not visible after login.').toBe(true);
    await expect(this.page.locator('h1:has-text("Web Application")')).toBeVisible({
      timeout: 5000,
    });

  }

  async wait(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  

}
