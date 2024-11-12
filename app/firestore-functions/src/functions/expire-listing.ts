import type { ExpireListingTaskData } from '@echo/firestore-functions/tasks/expire-listing-task'
import { onTaskDispatched } from '@echo/firestore-functions/tasks/helpers/on-task-dispatched'
import { expireListingTaskRequestHandler } from '@echo/firestore-functions/tasks/request-handlers/expire-listing-task-request-handler'

export const expireListing = onTaskDispatched<ExpireListingTaskData>(expireListingTaskRequestHandler)
