import { Page } from "@playwright/test";

export class CartPage {
    constructor(private page:Page){}

    async goToCart(){
        await this.page.locator('.shopping_cart_link').click();
        await this.page.locator('.cart_list').waitFor();
    }
}