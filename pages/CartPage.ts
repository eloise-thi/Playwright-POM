import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly deleteButton: Locator;
    readonly emptyCartMessage: Locator;
    readonly cartCount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator('#nav-cart');
        this.deleteButton = page.locator('.sc-action-delete-active');
        this.emptyCartMessage = page.locator('.sc-your-amazon-cart-is-empty');
        this.cartCount = page.locator('#nav-cart-count');
    }

    async openCart() {
        await this.cartLink.click();
    }

    async deleteFirstItem() {
        await this.deleteButton.click();
    }
}