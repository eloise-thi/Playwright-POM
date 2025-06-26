import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { MenuPage } from '../pages/MenuPage';

test.describe('Tests Amazon.fr POM', () => {
    test('Accéder à la page d\'accueil', async ({ page }) => {
        const home = new HomePage(page);
        await home.goto();
        await expect(page).toHaveTitle(/Amazon.fr/);
    });

    test('Refuser les cookies', async ({ page }) => {
        const home = new HomePage(page);
        await home.goto();
        await home.refuseCookies();
        await expect(home.cookieBanner).toBeHidden();
    });

    test('Recherche d\'un produit', async ({ page }) => {
        const home = new HomePage(page);
        await home.goto();
        await home.searchProduct('ordinateur portable');
    });

    test('Ajouter un produit au panier', async ({ page }) => {
        const home = new HomePage(page);
        const results = new SearchResultsPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);

        await home.goto();
        await home.searchProduct('ordinateur portable');
        await results.clickFirstProduct();
        await product.addToCart();
        await expect(cart.cartCount).toHaveText('1');
    });

    test('Supprimer un produit du panier', async ({ page }) => {
        const home = new HomePage(page);
        const results = new SearchResultsPage(page);
        const product = new ProductPage(page);
        const cart = new CartPage(page);

        await home.goto();
        await home.searchProduct('ordinateur portable');
        await results.clickFirstProduct();
        await product.addToCart();
        await cart.openCart();
        await cart.deleteFirstItem();
        await expect(cart.emptyCartMessage).toBeVisible();
    });

    test('Voir les avis clients', async ({ page }) => {
        const home = new HomePage(page);
        const results = new SearchResultsPage(page);
        const product = new ProductPage(page);

        await home.goto();
        await home.searchProduct('ordinateur portable');
        await results.clickFirstProduct();
        await expect(product.reviewsSection).toBeVisible();
    });

    test('Trier les résultats par prix croissant', async ({ page }) => {
        const home = new HomePage(page);
        const results = new SearchResultsPage(page);

        await home.goto();
        await home.searchProduct('ordinateur portable');
        await results.sortByPriceAscending();
        await expect(page.locator('#s-result-sort-select option:checked')).toHaveAttribute('value', 'price-asc-rank');
    });

    test('Pagination des résultats de recherche', async ({ page }) => {
        const home = new HomePage(page);
        const results = new SearchResultsPage(page);

        await home.goto();
        await home.searchProduct('livre');
        await results.goToNextPage();
        await expect(results.paginationSelected).toHaveText('2');
    });

    test('Navigation via le menu principal', async ({ page }) => {
        const home = new HomePage(page);
        const menu = new MenuPage(page);

        await home.goto();
        await menu.openHamburgerMenu();
        await menu.goToBooksCategory();
        await expect(page.getByText('LIVRES', { exact: true })).toBeVisible();
    });
});