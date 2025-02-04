import { Page, Locator, expect } from '@playwright/test';

export class ProjectBoard {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

/**
 * Veify the task in the given column
 * @param taskName 
 * @param columnName 
 * @returns 
 */
async verifyTaskInColumn(taskName: string, columnName: string): Promise<void> {
  const columns = this.page.locator(`.flex.flex-col.w-80.bg-gray-50.rounded-lg.p-4`);
  const columnCount = await columns.count();

  for (let i = 0; i < columnCount; i++) {
    const column = columns.nth(i);
    const header = column.locator(`h2:has-text("${columnName}")`);
    if (await header.count() === 0) continue; // Skip if column doesn't match

    const taskCards = column.locator('div.bg-white.p-4.rounded-lg');
    const taskCardCount = await taskCards.count();

    for (let k = 0; k < taskCardCount; k++) {
      const taskCard = taskCards.nth(k);
      const taskHeading = taskCard.locator(`h3:has-text("${taskName}")`);


      if (await taskHeading.count() > 0) {
        expect(await taskHeading.count()).toBeGreaterThan(0); // Assertion here

        return; // Task found, exit
      }
    }
  }

 
  expect(false, ` Task "${taskName}" was NOT found in column "${columnName}".`).toBe(true);
}

/**
 * Verify the tags for the given task
 * @param columnName
 * @param taskName 
 * @param expectedTags 
 * @returns 
 */
async verifyTaskTags(columnName: string, taskName: string, expectedTags: string[]): Promise<void> {
  const columns = this.page.locator(`.flex.flex-col.w-80.bg-gray-50.rounded-lg.p-4`);
  const columnCount = await columns.count();

  for (let i = 0; i < columnCount; i++) {
    const column = columns.nth(i);
    const header = column.locator(`h2:has-text("${columnName}")`);
    if (await header.count() === 0) continue; // Skip if column doesn't match

    const taskCards = column.locator('div.bg-white.p-4.rounded-lg');
    const taskCardCount = await taskCards.count();

    for (let k = 0; k < taskCardCount; k++) {
      const taskCard = taskCards.nth(k);
      const taskHeading = taskCard.locator(`h3:has-text("${taskName}")`);
      if (await taskHeading.count() === 0) continue; // Skip if task doesn't match

      const tagElements = taskCard.locator('span.px-2.rounded-full');
      const tagCount = await tagElements.count();

      const actualTags: string[] = [];
      for (let j = 0; j < tagCount; j++) {
        const tagText = await tagElements.nth(j).innerText();
        actualTags.push(tagText);
        //console.log(`🔍 Found tag: "${tagText}"`);
      }

   
      expect(actualTags.sort()).toEqual(expectedTags.sort());

      //console.log(`All tags for task "${taskName}" are verified successfully.`);
      return; // All tags verified, exit
    }
  }

 
  expect(false, ` Task "${taskName}" was NOT found in column "${columnName}".`).toBe(true);
}


}
