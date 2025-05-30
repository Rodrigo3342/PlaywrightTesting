import { Page } from "@playwright/test";

export class CheckoutStepOne {
    constructor(private page:Page) {}

    async fillData(firstName: string, lastName: string, zipCode: string){
        await this.page.getByPlaceholder('First Name').fill(firstName);
        await this.page.getByPlaceholder('Last Name').fill(lastName);
        await this.page.getByPlaceholder('Zip/Postal Code').fill(zipCode);
        await this.page.getByRole('button', {name:'continue'}).click();
    }
}