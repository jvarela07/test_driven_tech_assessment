"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardPage = void 0;
class DashboardPage {
    constructor(page) {
        this.page = page;
    }
    navigateTo(section) {
        return __awaiter(this, void 0, void 0, function* () {
            // Assumes that a clickable element with the section text exists.
            yield Promise.all([
                this.page.waitForNavigation({ waitUntil: 'networkidle' }),
                this.page.click(`text=${section}`)
            ]);
        });
    }
    getTaskCard(taskName) {
        // Assumes that each task card contains the task name.
        return this.page.locator(`.task-card:has-text("${taskName}")`);
    }
    verifyTaskInColumn(taskName, columnName) {
        return __awaiter(this, void 0, void 0, function* () {
            // Locate the column and then the task within that column.
            const column = this.page.locator(`.column:has-text("${columnName}")`);
            const taskCard = column.locator(`.task-card:has-text("${taskName}")`);
            yield taskCard.waitFor({ state: 'visible', timeout: 5000 });
        });
    }
    verifyTaskTags(taskName, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskCard = this.getTaskCard(taskName);
            for (const tag of tags) {
                // Each tag is assumed to be a child element with class "tag".
                yield taskCard.locator(`.tag:has-text("${tag}")`).waitFor({ state: 'visible', timeout: 5000 });
            }
        });
    }
}
exports.DashboardPage = DashboardPage;
