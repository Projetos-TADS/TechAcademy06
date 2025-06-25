import { test, expect } from "@playwright/test";

test.describe("Directors list", () => {
	test("Admin user can create a new director", async ({ page }) => {
		await page.goto("http://localhost:5173/");

		await page.fill("input[type='email']", "test@mail.com");
		await page.fill("input[type='password']", "password123");
		await page.click("button[type='submit']");

		await expect(page).toHaveURL("http://localhost:5173/movies");
		await expect(page.getByText("LISTA DE DIRETORES")).toBeVisible();
		await page.click("button#new-diretor");

		await page.fill("input[name='name']", "E2E Test");
		await page.fill("input[name='nationality']", "Brasileira");
		await page.fill("input[name='birthDate']", "2001-01-01");
		await page.press("input[name='birthDate']", "Tab");
		await page.click("button#create-diretor");

		const successToast = page.locator("#director-success-toast");
		await expect(successToast).toBeVisible();
		await expect(successToast).toHaveText("Diretor cadastrado com sucesso!");
	});

	test("Admin user can't create a director with blank inputs", async ({ page }) => {
		await page.goto("http://localhost:5173/");

		await page.fill("input[type='email']", "test@mail.com");
		await page.fill("input[type='password']", "password123");
		await page.click("button[type='submit']");

		await expect(page).toHaveURL("http://localhost:5173/movies");
		await expect(page.getByText("LISTA DE DIRETORES")).toBeVisible();
		await page.click("button#new-diretor");

		await page.click("button#create-diretor");
		await expect(page.getByText("Required").first()).toBeVisible();
		const inputMessageCount = await page.locator(".ant-form-item-explain-error").count();
		expect(inputMessageCount).toBe(3);

		await page.fill("input[name='name']", "E2E Test");
		await page.fill("input[name='name']", "");
		await page.fill("input[name='nationality']", "Teste");
		await page.fill("input[name='nationality']", "");
		await page.fill("input[name='birthDate']", "2001-01-01");
		await page.press("input[name='birthDate']", "Tab");
		await page.click(".ant-picker-clear");

		await expect(page.getByText("Name is required")).toBeVisible();
		await expect(page.getByText("Nationality is required")).toBeVisible();
		await expect(page.getByText("Birth Date is required")).toBeVisible();
	});

	test("Admin user can edit an director", async ({ page }) => {
		await page.goto("http://localhost:5173/");

		await page.fill("input[type='email']", "test@mail.com");
		await page.fill("input[type='password']", "password123");
		await page.click("button[type='submit']");

		await expect(page).toHaveURL("http://localhost:5173/movies");
		await expect(page.getByText("LISTA DE DIRETORES")).toBeVisible();
		await page.locator("button#edit-diretor").first().click();

		await page.fill("input[name='name']", "E2E Test Edit");
		await page.fill("input[name='birthDate']", "2000-01-01");
		await page.press("input[name='birthDate']", "Tab");
		await page.click("button#edit-diretor[type='submit']");

		const successToast = page.locator("#director-success-toast");
		await expect(successToast).toBeVisible();
		await expect(successToast).toHaveText("Diretor atualizado com sucesso!");
	});

	test("Admin user can delete an director", async ({ page }) => {
		await page.goto("http://localhost:5173/");

		await page.fill("input[type='email']", "test@mail.com");
		await page.fill("input[type='password']", "password123");
		await page.click("button[type='submit']");

		await expect(page).toHaveURL("http://localhost:5173/movies");
		await expect(page.getByText("LISTA DE ATORES")).toBeVisible();
		await page.locator("button#delete-diretor").first().click();

		await page.locator(".ant-popconfirm-buttons").getByText("Sim").click();

		const successToast = page.locator("#director-success-toast");
		await expect(successToast).toBeVisible();
		await expect(successToast).toHaveText("Diretor deletado com sucesso!");
	});

	test("Admin user can render directors list", async ({ page }) => {
		await page.goto("http://localhost:5173/");

		await page.fill("input[type='email']", "test@mail.com");
		await page.fill("input[type='password']", "password123");
		await page.click("button[type='submit']");

		await expect(page).toHaveURL("http://localhost:5173/movies");
		await expect(page.getByText("LISTA DE ATORES")).toBeVisible();
		await expect(page.locator("div#diretor-list").getByText(/E2E Test/)).toBeVisible();
	});
});
