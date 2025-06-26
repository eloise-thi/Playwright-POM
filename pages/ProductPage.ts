import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly reviewsSection: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('#add-to-cart-button');
        this.reviewsSection = page.locator('#reviews-medley-footer');
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
}