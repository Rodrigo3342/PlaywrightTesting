import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { InventoryPage } from "../../../pages/InventoryPage";
import { CartPage } from "../../../pages/CartPage";
import { CheckoutStepOne } from "../../../pages/CheckoutStepOne";
import { CREDENTIALS, FILTERS } from "../../../utils/constants";

test.describe('Products',() => {

    let loginPage : LoginPage;
    let inventoryPage : InventoryPage;
    let cartPage : CartPage;
    let checkoutStepOne : CheckoutStepOne;

    test.beforeEach(async({page})=>{
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutStepOne = new CheckoutStepOne(page);

        await loginPage.goto();
        await loginPage.login(CREDENTIALS.valid_user.username,CREDENTIALS.valid_user.password);
    })

    test('Add product to cart', async ({page}) =>{
        const PRODUCT = 'Sauce Labs Backpack';

        await inventoryPage.addEspecificProduct(PRODUCT);
        expect(page.locator('.shopping_cart_badge')).toBeVisible();

        await cartPage.goToCart();
        await expect(page.locator('.cart_item')).toBeVisible();
        await expect(page.locator('.inventory_item_name')).toHaveText(PRODUCT);
        await expect(page.locator('.inventory_item_price')).toBeVisible();
    })

    test('Order Products', async ({page})=> {
        const filter = 'Price (high to low)';

        await inventoryPage.orderProducts(FILTERS.HightoLow.order);
        
        const prices = await page.locator('.inventory_item_price').allTextContents();
        const priceNumbers = prices.map(p => parseFloat(p.replace('$ ', '')));
        const sorted = [...priceNumbers].sort((a, b) => b - a); // orden descendente

        expect(priceNumbers).toEqual(sorted);
    })

    test('Add button change to Remove', async ({page})=>{
        await inventoryPage.addFirstProduct();
        expect(page.locator('.shopping_cart_badge')).toBeVisible();
        expect(page.locator('[data-test="inventory-item"]').first().locator('button')).toHaveText('Remove');
    })

    test('Verify the number of products addeed to the cart is updated', async ({page})=>{
        const PRODUCTS = {
            firstProduct: 'Sauce Labs Backpack',
            secondProduct: 'Sauce Labs Bike Light'
        };
        await inventoryPage.addEspecificProduct(PRODUCTS.firstProduct);
        await inventoryPage.addEspecificProduct(PRODUCTS.secondProduct);
        expect(page.locator('.shopping_cart_badge')).toBeVisible();
        expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    })

    test('Verify product detail navigation', async ({page})=>{
        const PRODUCT = 'Sauce Labs Backpack';

        await inventoryPage.goToItem(PRODUCT);

        await expect(page.locator('#inventory_item_container')).toBeVisible();
        await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(PRODUCT);
        await expect(page).toHaveURL(/inventory-item.html/);

    })

    test('Verify checkout process', async ({page})=>{
        const PRODUCT = 'Sauce Labs Backpack', PRICE = '$29.99';
        const USER = {
            firstName: 'Rodrigo',
            lastName: 'Valda',
            zipCode: '00000'
        }

        await inventoryPage.addEspecificProduct(PRODUCT);
        await expect(page.locator('.shopping_cart_badge')).toBeVisible();
        await cartPage.goToCart();

        await cartPage.goToCheckout();
        await checkoutStepOne.fillData(USER.firstName,USER.lastName,USER.zipCode);
        
        await expect(page).toHaveURL('checkout-step-two.html');
        await expect(page.locator('.inventory_item_price')).toHaveText(PRICE);
        await expect(page.locator('.inventory_item_name')).toHaveText(PRODUCT);
    })
})