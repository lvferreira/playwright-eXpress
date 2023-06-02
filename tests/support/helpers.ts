import { expect, APIRequestContext } from '@playwright/test'
import { TaskModel } from '../fixtures/task.model'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// import express from 'express'
dotenv.config()
const BASE_API = process.env.BASE_API

export async function deleteTaskByHelper(
	request: APIRequestContext,
	taskName: string
) {
	await request.delete(`${BASE_API}/helper/tasks/${taskName}`)
}

export async function postTask(request: APIRequestContext, task: TaskModel) {
	const newTask = await request.post(`${BASE_API}/tasks/`, {
		data: task,
	})
	expect(newTask.ok()).toBeTruthy()
}
