import { TaskModel } from './fixtures/task.model'
import { TaskPage } from './support/pages/tasks'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { test } from '@playwright/test'

import data from './fixtures/tasks.json'

let taskPage: TaskPage
test.beforeEach(({ page }) => {
	taskPage = new TaskPage(page)
})

test.describe('create', () => {
	test('should be able to create a new task', async ({ request }) => {
		const task = data.success as TaskModel

		await deleteTaskByHelper(request, task.name)

		await taskPage.go()
		await taskPage.create(task)
		await taskPage.shouldBeVisible(task.name)
	})

	test('should not allow duplicate tasks', async ({ request }) => {
		const task = data.duplicate as TaskModel

		await deleteTaskByHelper(request, task.name)
		await postTask(request, task)

		await taskPage.go()
		await taskPage.create(task)
		await taskPage.shouldHaveText('Task already exists!')
	})

	test('should validate required fields', async () => {
		const task = data.required as TaskModel

		await taskPage.go()
		await taskPage.create(task)
		await taskPage.checkMessage('This is a required field')
	})
})

test.describe('update', () => {
	test('should close a task', async ({ request }) => {
		const task = data.update as TaskModel

		await deleteTaskByHelper(request, task.name)
		await postTask(request, task)

		await taskPage.go()
		await taskPage.toggleItem(task.name)
		await taskPage.shouldBeDone(task.name)
	})
})

test.describe('delete', () => {
	test('should delete a task', async ({ request }) => {
		const task = data.delete as TaskModel

		await deleteTaskByHelper(request, task.name)
		await postTask(request, task)

		await taskPage.go()
		await taskPage.deleteTask(task.name)
		await taskPage.shouldNotExist(task.name)
	})
})
