import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { CREDENTIALS } from "../../../utils/constants";

test.describe("Login UI", () => {

    test('Login page with valid credentials', async ({page})=>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(CREDENTIALS.valid_user.username, CREDENTIALS.valid_user.password);
        await expect(page).toHaveURL(/inventory.html/);
    })

    test('Logout page', async ({page})=>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(CREDENTIALS.valid_user.username, CREDENTIALS.valid_user.password);
        await loginPage.logout();

        await expect(page).toHaveURL('/');
        await expect(page.locator('#user-name')).toBeVisible();
    })

    test('Longin page with locked out credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(CREDENTIALS.locked_out_user.username, CREDENTIALS.locked_out_user.password);

        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    })
});