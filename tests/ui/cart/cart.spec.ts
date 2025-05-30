import { expect,test } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { InventoryPage } from "../../../pages/InventoryPage";
import { CartPage } from "../../../pages/CartPage";
import { CREDENTIALS } from "../../../utils/constants";

test.describe("Cart UI", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page); 
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        await loginPage.goto();
        await loginPage.login(CREDENTIALS.valid_user.username, CREDENTIALS.valid_user.password);
    });

    test('Cart page with products', async ({page}) => {
        await inventoryPage.addFirstProduct();
        await expect(page.locator('.shopping_cart_badge')).toBeVisible();

        await cartPage.goToCart();
        await expect(page.locator('.cart_item')).toBeVisible();

        await cartPage.removeFirstProduct();
        await expect(page.locator('.cart_item')).toHaveCount(0);
        await expect(page.locator('.removed_cart_item')).toBeVisible();
    });

    test('Cart page with empty cart', async ({page}) => {
        await page.goto('/cart.html');
        await expect(page.locator('.cart_item')).toHaveCount(0);
        await expect(page.locator('.cart_footer')).toBeVisible();
    });
});