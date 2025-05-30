import { Page } from "@playwright/test";

export class CartPage {
    constructor(private page:Page){}

    async goToCart(){
        await this.page.locator('.shopping_cart_link').click();
        await this.page.locator('.cart_list').waitFor();
    }

    async removeFirstProduct(){
        await this.page.locator('#remove-sauce-labs-backpack').first().click();
    }

    async goToCheckout(){
        //await this.page.locator('#shopping_cart_badge').waitFor();
        await this.page.locator('[data-test="checkout"]').click();
    }
}