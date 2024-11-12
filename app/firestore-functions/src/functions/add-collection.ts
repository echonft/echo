import type { AddCollectionTaskData } from '@echo/firestore-functions/tasks/add-collection-task'
import { onTaskDispatched } from '@echo/firestore-functions/tasks/helpers/on-task-dispatched'
import { addColletionRequestHandler } from '@echo/firestore-functions/tasks/request-handlers/add-colletion-request-handler'

export const addCollection = onTaskDispatched<AddCollectionTaskData>(addColletionRequestHandler)
