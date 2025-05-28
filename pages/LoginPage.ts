import { Page } from "@playwright/test";

export class LoginPage {
    constructor(private page: Page){}

    async goto() {
        await this.page.goto('/');
    }

    async login(username: string, password: string) {
        await this.page.fill('#user-name', username);
        await this.page.fill('#password', password);
        await this.page.click('#login-button');
    }

    async logout() {
        await this.page.waitForSelector('#react-burger-menu-btn');
        await this.page.getByRole('button',{name:"Open Menu"}).click();
        await this.page.click('#logout_sidebar_link');
    }

    async getErrorMessage(){
        return this.page.locator('[data-test="error"]').innerText();
    }
}