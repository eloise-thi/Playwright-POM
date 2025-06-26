import { Page } from '@playwright/test';

export class MenuPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openHamburgerMenu() {
        await this.page.locator('#nav-hamburger-menu').click();
        await this.page.waitForSelector('.hmenu-visible');
    }

    async goToBooksCategory() {
        await this.page.getByRole('button', { name: 'Livres', exact: true }).click();
        await this.page.getByRole('link', { name: 'Tous les livres' }).nth(1).click();
    }
}