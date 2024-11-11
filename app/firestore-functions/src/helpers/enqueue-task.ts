import { TaskError } from '@echo/firestore-functions/constants/errors/task-error'
import { error } from '@echo/firestore-functions/constants/logger'
import type { Task, TaskData } from '@echo/firestore-functions/types/task'
import { getFunctions } from 'firebase-admin/functions'

export async function enqueueTask<T extends TaskData>(task: Task<T>): Promise<void> {
  const queue = getFunctions().taskQueue<T>(task.name)
  try {
    await queue.enqueue(task.data, task.options)
  } catch (err) {
    error({ err, task }, TaskError.Queue)
  }
}
