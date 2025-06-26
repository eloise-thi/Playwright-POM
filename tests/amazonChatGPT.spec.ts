// Feature: Navigation vers amazon.fr
import { test, expect } from '@playwright/test';

test.describe('Navigation vers amazon.fr', () => {
    // Scenario: Accéder à la page d'accueil
    // Given Je suis un utilisateur non connecté
    // When Je vais sur amazon.fr
    // Then La page d\'accueil doit s\'afficher correctement
    test('Accéder à la page d\'accueil', async ({ page }) => {
        await page.goto('https://www.amazon.fr');
        await expect(page).toHaveTitle(/Amazon.fr/);
    });


    // Feature: Gestion des cookies RGPD
    // Scenario: Refuser les cookies
    //     Given Je suis sur amazon.fr
    //     When Je clique sur "Refuser les cookies"
    //     Then Le message de cookies doit disparaître
    //     And La préférence doit être sauvegardée
    test('Refuser les cookies', async ({ page }) => {
        await page.goto('https://www.amazon.fr');
        const refuseCookiesButton = page.locator('#sp-cc-rejectall-link');
        await refuseCookiesButton.click();
        const cookieBanner = page.locator('#sp-cc-banner');
        await expect(cookieBanner).toBeHidden();
    });


    // Feature: Recherche de produit
    // Scenario: Recherche d'un produit "ordinateur portable"
    //     Given Je suis sur la page d'accueil amazon.fr
    //     When Je recherche "ordinateur portable"
    //     Then Les résultats pertinents doivent s'afficher
    test('Recherche d\'un produit "ordinateur portable"', async ({ page }) => {
        await page.goto('https://www.amazon.fr');
        const searchInput = page.locator('#twotabsearchtextbox');
        await searchInput.fill('ordinateur portable');
        await searchInput.press('Enter');
    });


    // Feature: Ajout au panier
    // Scenario: Ajouter un produit au panier
    //     Given Je suis sur la page d'accueil amazon.fr
    //     And J'ai recherché un produit
    //     When Je sélectionne un produit
    //     And Je clique sur "Ajouter au panier"
    //     Then Le produit doit être ajouté au panier
    //     And Une confirmation doit apparaître
    test('Ajouter un produit au panier', async ({ page }) => {
        await page.goto('https://www.amazon.fr');
        const searchInput = page.locator('#twotabsearchtextbox');
        await searchInput.fill('ordinateur portable');
        await searchInput.press('Enter');
        const firstProduct = page.locator('.s-main-slot .s-result-item').first();
        await firstProduct.click();
        const addToCartButton = page.locator('#add-to-cart-button');
        await addToCartButton.click();
        const cartCount = page.locator('#nav-cart-count');
        await expect(cartCount).toHaveText('1');
    });


    // Feature: Suppression produit du panier
    // Scenario: Supprimer un produit du panier
    //     Given Un produit est dans le panier
    //     When Je vais sur la page du panier
    //     And Je supprime ce produit
    //     Then Le produit ne doit plus apparaître dans le panier
    //     And Le total du panier doit être mis à jour
    test('Supprimer un produit du panier', async ({ page }) => {
        await page.goto('https://www.amazon.fr');
        const searchInput = page.locator('#twotabsearchtextbox');
        await searchInput.fill('ordinateur portable');
        await searchInput.press('Enter');
        const firstProduct = page.locator('.s-main-slot .s-result-item').first();
        await firstProduct.click();
        const addToCartButton = page.locator('#add-to-cart-button');
        await addToCartButton.click();

        const cartLink = page.locator('#nav-cart');
        await cartLink.click();

        const deleteButton = page.locator('.sc-action-delete-active')
        await deleteButton.click();

        await expect(page.locator('.sc-your-amazon-cart-is-empty')).toBeVisible();
    });


    // Feature: Affichage des avis clients
    // Scenario: Voir les avis sur un produit
    //     Given Je suis sur la page d'un produit
    //     When La page charge
    //     Then Les avis clients doivent s'afficher correctement
    test('Voir les avis sur un produit', async ({ page }) => {
        await page.goto('https://www.amazon.fr');
        const searchInput = page.locator('#twotabsearchtextbox');
        await searchInput.fill('ordinateur portable');
        await searchInput.press('Enter');

        const firstProduct = page.locator('.s-main-slot .s-result-item').first();
        await firstProduct.click();

        const reviewsTab = page.locator('#reviews-medley-footer');
        await expect(reviewsTab).toBeVisible();
    });


    // Feature: Tri des résultats
    // Scenario: Trier les résultats par prix croissant
    //     Given Je recherche un produit
    //     When Je trie les résultats par "prix croissant"
    //     Then Les résultats doivent être triés correctement
    test('Trier les résultats par prix croissant', async ({ page }) => {
        await page.goto('https://www.amazon.fr');
        const searchInput = page.locator('#twotabsearchtextbox');
        await searchInput.fill('ordinateur portable');
        await searchInput.press('Enter');

        const sortDropdown = page.locator('#s-result-sort-select');
        await sortDropdown.selectOption({ value: 'price-asc-rank' });

        // Attendre que l'option sélectionnée soit visible
        const selectedOption = page.locator('#s-result-sort-select option:checked');

        // Vérifier que l'attribut tabindex est défini correctement
        await expect(selectedOption).toHaveAttribute('value', 'price-asc-rank');
    });

    // Scenario: Tester la pagination des résultats de recherche
    // Given je suis sur la page des résultats pour "livre"
    // When je clique sur le bouton "Page suivante"
    // Then la page affiche la deuxième série de résultats
    test('Tester la pagination des résultats de recherche', async ({ page }) => {
        await page.goto('https://www.amazon.fr');
        const searchInput = page.locator('#twotabsearchtextbox');
        await searchInput.fill('livre');
        await searchInput.press('Enter');

        const nextPageButton = page.locator('.s-pagination-next');
        await nextPageButton.click();

        // Vérifier que la deuxième page de résultats est affichée
        const secondPageIndicator = page.locator('.s-pagination-item.s-pagination-selected');
        await expect(secondPageIndicator).toHaveText('2');
    });


    //   Feature: Navigation via le menu principal sur Amazon.fr
    //   Scenario: Ouvrir une catégorie via le menu principal
    //     Given je suis sur la page d'accueil amazon.fr
    //     When je clique sur le menu "Toutes"
    //And je sélectionne la catégorie "Livres"
    //     And je sélectionne "Tous les livres"
    //     Then je suis redirigé vers la page des produits de la catégorie "Livres"
    //     And je vois une liste de produits correspondant à cette catégorie
    test('Navigation vers Livres > Tous les livres via le menu principal', async ({ page }) => {
        await page.goto('https://www.amazon.fr');
        await page.locator('#nav-hamburger-menu').click();
        await page.waitForSelector('.hmenu-visible');
        await page.getByRole('button', { name: 'Livres', exact: true }).click();
        await page.getByRole('link', { name: 'Tous les livres' }).nth(1).click();
        await page.getByText('LIVRES', { exact: true }).isVisible();
    });

});