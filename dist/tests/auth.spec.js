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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("./page/LoginPage");
// Import test data (ensure "resolveJsonModule" is enabled in tsconfig.json)
const projectBoardData_json_1 = __importDefault(require("./data/projectBoardData.json"));
for (const data of projectBoardData_json_1.default) {
    test_1.test.describe(data.name, () => {
        (0, test_1.test)(`Login and verify task "${data.task}" in column "${data.column}" with correct tags`, (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
            //Go to project board site
            yield page.goto(data.url);
            yield page.waitForSelector('#username', { state: 'visible', timeout: 30000 });
            const loginPage = new LoginPage_1.LoginPage(page);
            yield loginPage.login(data.credentials.email, data.credentials.password);
            // Optional: Validate that login was successful (e.g., check URL, header, etc.)
            // await expect(page).toHaveURL(/dashboard/);
            //   const dashboard = new DashboardPage(page);
            //   await dashboard.navigateTo(data.navigation);
            //   await dashboard.verifyTaskInColumn(data.task, data.column);
            //   await dashboard.verifyTaskTags(data.task, data.tags);
        }));
    });
}
