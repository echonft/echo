import type { DocumentOptions } from 'firebase-functions/v2/firestore'
import type { ScheduleOptions } from 'firebase-functions/v2/scheduler'
import type { TaskQueueOptions } from 'firebase-functions/v2/tasks'
import { assoc } from 'ramda'

export function setMaxInstances<
  T extends DocumentOptions<Document> | ScheduleOptions | TaskQueueOptions,
  Document extends string
>(options: T) {
  return assoc('maxInstances', 10, options) as T
}
