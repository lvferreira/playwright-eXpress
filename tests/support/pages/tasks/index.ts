import { Page, Locator, expect } from '@playwright/test'
import { TaskModel } from '../../../fixtures/task.model'

export class TaskPage {
	readonly page: Page
	readonly inputNewTask: Locator

	constructor(page: Page) {
		this.page = page
		this.inputNewTask = page.locator('#newTask')
	}

	async go() {
		await this.page.goto('/')
		await expect(this.page).toHaveTitle('Gerencie suas tarefas com Mark L')
	}

	async create(task: TaskModel) {
		// await page.fill('#newTask', 'Read a Typescript book')
		await this.inputNewTask.fill(task.name)

		// await taskName.press('Enter')
		// await page.click('xpath=//button[contains(text(), 'Create')]')
		await this.page.click('css=button >> text=Create')
	}

	async toggleItem(taskName: string) {
		//p[text()="To Read a Typescript Book"]/..//button[contains(@class, "Toggle")]
		const element = this.page.locator(
			`xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Toggle")]`
		)
		await element.click()
	}

	async checkMessage(text: string) {
		const validationMessage = await this.inputNewTask.evaluate(
			(element) => (element as HTMLInputElement).validationMessage
		)
		expect(validationMessage).toEqual(text)
	}

	async shouldBeVisible(taskName: string) {
		// const element = page.getByTestId('task-item')
		const element = this.page.locator('css=.task-item p >> text=' + taskName)
		await expect(element).toBeVisible()
	}

	async shouldHaveText(text: string) {
		const element = this.page.locator('.swal2-html-container')
		await expect(element).toHaveText(text)
	}

	async shouldBeDone(taskName: string) {
		const element = this.page.getByText(taskName)
		await expect(element).toHaveCSS('text-decoration-line', 'line-through')
	}

	async shouldNotExist(taskName: string) {
		const element = this.page.locator('css=.task-item p >> text=' + taskName)
		await expect(element).not.toBeVisible()
	}

	async deleteTask(taskName: string) {
		const element = this.page.locator(
			`xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Delete")]`
		)
		await element.click()
	}
}
