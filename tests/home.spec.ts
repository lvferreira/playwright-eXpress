import { test, expect } from '@playwright/test'

test('webapp should be online', async ({ page }) => {
	await page.goto('/')
	await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L')
})
