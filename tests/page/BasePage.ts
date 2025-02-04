import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Clicks an element and waits for the page to reach the specified load state.
   * @param selector - The selector for the element to click.
   * @param loadState - The load state to wait for (default is 'networkidle').
   */
  async clickAndWait(selector: string, loadState: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle'): Promise<void> {
    await Promise.all([
      this.page.waitForLoadState(loadState),
      this.page.click(selector)
    ]);
  }
}
