import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly refuseCookiesButton: Locator;
    readonly cookieBanner: Locator;
    readonly hamburgerMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#twotabsearchtextbox');
        this.refuseCookiesButton = page.locator('#sp-cc-rejectall-link');
        this.cookieBanner = page.locator('#sp-cc-banner');
        this.hamburgerMenu = page.locator('#nav-hamburger-menu');
    }

    async goto() {
        await this.page.goto('https://www.amazon.fr');
    }

    async refuseCookies() {
        await this.refuseCookiesButton.click();
    }

    async searchProduct(productName: string) {
        await this.searchInput.fill(productName);
        await this.searchInput.press('Enter');
    }
}