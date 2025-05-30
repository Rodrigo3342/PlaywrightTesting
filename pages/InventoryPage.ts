import { Page } from "@playwright/test";

export class InventoryPage {
    constructor(private page: Page){}

    async addFirstProduct(){
        await this.page.locator('[data-test="inventory-container"]').waitFor();
        await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').first().click();
    }

    async addEspecificProduct(productName: string ){
        await this.page.locator('[data-test="inventory-container"]').waitFor();
        await this.page.locator('[data-test="inventory-item"]').filter({hasText: productName}).locator('button').click();
    }

    async orderProducts(filterName: string){
        await this.page.locator('.product_sort_container').click();
        await this.page.locator('.product_sort_container').selectOption({label: filterName})
    }

    async goToItem(productName: string){
        await this.page.locator('.inventory_item').filter({hasText:productName}).locator('img').click();
    }
}