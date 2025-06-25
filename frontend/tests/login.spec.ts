//Login (caso de sucesso e de falha)
import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
	test("Successful login redirects to /movies", async ({ page }) => {
		//TODO:confirmar se será essa porta com Docker
		await page.goto("http://localhost:5173/");

		await page.fill("input[type='email']", "test@mail.com");
		await page.fill("input[type='password']", "password123");
		await page.click("button[type='submit']");

		await expect(page).toHaveTitle("BLOCKBUSTER");
		await expect(page).toHaveURL("http://localhost:5173/movies");
	});

	test("Unsuccessful login shows toast error message", async ({ page }) => {
		await page.goto("http://localhost:5173/");

		await page.fill("input[type='email']", "test@mail.com");
		await page.fill("input[type='password']", "password1234");
		await page.click("button[type='submit']");

		const errorToast = page.locator("#login-error-toast");
		await expect(errorToast).toBeVisible();
		await expect(errorToast).toHaveText("Credenciais inválidas");
	});
});
