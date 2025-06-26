import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page;
    readonly firstProduct: Locator;
    readonly sortDropdown: Locator;
    readonly nextPageButton: Locator;
    readonly paginationSelected: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstProduct = page.locator('.s-main-slot .s-result-item').first();
        this.sortDropdown = page.locator('#s-result-sort-select');
        this.nextPageButton = page.locator('.s-pagination-next');
        this.paginationSelected = page.locator('.s-pagination-item.s-pagination-selected');
    }

    async clickFirstProduct() {
        await this.firstProduct.click();
    }

    async sortByPriceAscending() {
        await this.sortDropdown.selectOption({ value: 'price-asc-rank' });
    }

    async goToNextPage() {
        await this.nextPageButton.click();
    }
}