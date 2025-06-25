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
		await page.getByPlaceholder("000.000.000-00").fill("00000000272");
		await page.fill("input[name='password']", "password123");
		await page.fill("input[name='confirmPassword']", "password123");

		await page.click("button[type='submit']");

		//Success toast
		const successToast = page.locator("#signup-success-toast");
		await expect(successToast).toBeVisible();
		await expect(successToast).toHaveText("Usuário cadastrado com sucesso!");
		await expect(page).toHaveURL("http://localhost:5173/");

		//Login
		await page.fill("input[type='email']", "e2etest@mail.com");
		await page.fill("input[type='password']", "password123");

		await page.click("button[type='submit']");

		//Blockbuster movies homepage redirection
		await expect(page).toHaveURL("http://localhost:5173/movies");
		await expect(page).toHaveTitle("BLOCKBUSTER");
	});

	// Unsuccessful registration (CPF)
	test("Duplicated CPF and toast error message", async ({ page }) => {
		await page.goto("http://localhost:5173/signup");

		await page.fill("input[name='name']", "E2E Test");
		await page.fill("input[name='email']", "e2etest@mail.com");
		await page.getByPlaceholder("000.000.000-00").fill("00000000191");
		await page.fill("input[name='password']", "password123");
		await page.fill("input[name='confirmPassword']", "password123");

		await page.click("button[type='submit']");

		const errorToast = page.locator("#signup-error-toast");
		await expect(errorToast).toBeVisible();
		await expect(errorToast).toHaveText("This CPF is already in use by another user.");
	});

	// Unsuccessful registration (email)
	test("Duplicated email and toast error message", async ({ page }) => {
		await page.goto("http://localhost:5173/signup");

		await page.fill("input[name='name']", "E2E Test");
		await page.fill("input[name='email']", "e2etest@mail.com");
		await page.getByPlaceholder("000.000.000-00").fill("00000000353");
		await page.fill("input[name='password']", "password123");
		await page.fill("input[name='confirmPassword']", "password123");

		await page.click("button[type='submit']");

		const errorToast = page.locator("#signup-error-toast");
		await expect(errorToast).toBeVisible();
		await expect(errorToast).toHaveText("This email is already in use by another active user.");
	});

	// Unsuccessful registration (password)
	test("Invalid password", async ({ page }) => {
		await page.goto("http://localhost:5173/signup");

		await page.fill("input[name='name']", "E2E Test");
		await page.fill("input[name='email']", "e2etest@mail.com");
		await page.getByPlaceholder("000.000.000-00").fill("00000000191");
		await page.fill("input[name='password']", "password123");
		await page.fill("input[name='confirmPassword']", "password12");

		await page.click("button[type='submit']");

		await expect(page.locator(".ant-form-item-explain-error")).toBeVisible();
		await expect(page.locator(".ant-form-item-explain-error")).toHaveText("Password do not match");

		await page.fill("input[name='password']", "12345");
		await expect(page.locator(".ant-form-item-explain-error").first()).toBeVisible();
		await expect(page.locator(".ant-form-item-explain-error").first()).toContainText(
			"Password must be at least 6 characters"
		);
	});
});
