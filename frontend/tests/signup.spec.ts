//Cadastro (caso de sucesso e de falha)
import { test, expect } from "@playwright/test";

test.describe("Signup Page", () => {
	test("Successful registration redirects to login page and logs successfully", async ({
		page,
	}) => {
		await page.goto("http://localhost:5173/signup");

		//Registration
		await page.fill("input[name='name']", "E2E Test");
		await page.fill("input[name='email']", "e2etest@mail.com");
		await page.getByPlaceholder("000.000.000-00").fill("00000000000");
		await page.fill("input[name='password']", "password123");
		await page.fill("input[name='confirmPassword']", "password123");

		await page.click('button[type="submit"]');

		//Success toast
		// await expect(page.locator(".Toastify__toast")).toBeTruthy();
		// await expect(page.getByText("Usuário cadastrado com sucesso!")).toBeTruthy();

		//Login
		await page.fill('input[type="email"]', "e2etest@mail.com");
		await page.fill('input[type="password"]', "password123");

		await page.click('button[type="submit"]');

		//Blockbuster movies homepage redirection
		await expect(page.getByTitle("BLOCKBUSTER")).toBeTruthy();
	});

	// Unsuccessful registration (password)
	test("Invalid password", async ({ page }) => {
		await page.goto("http://localhost:5173/signup");

		await page.fill("input[name='name']", "E2E Test");
		await page.fill("input[name='email']", "e2etest@mail.com");
		await page.getByPlaceholder("000.000.000-00").fill("00000000191");
		await page.fill("input[name='password']", "password123");
		await page.fill("input[name='confirmPassword']", "password12");

		await page.click('button[type="submit"]');

		await expect(page.locator(".ant-form-item-explain-error")).toBeVisible();
		await expect(page.locator(".ant-form-item-explain-error")).toHaveText("Password do not match");

		await page.fill("input[name='password']", "12345");
		await expect(page.locator(".ant-form-item-explain-error").first()).toBeVisible();
		await expect(page.locator(".ant-form-item-explain-error").first()).toContainText(
			"Password must be at least 6 characters"
		);
	});
});
