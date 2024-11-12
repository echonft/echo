import type { CancelListingTaskData } from '@echo/firestore-functions/tasks/cancel-listing-task'
import { onTaskDispatched } from '@echo/firestore-functions/tasks/helpers/on-task-dispatched'
import { cancelListingRequestHandler } from '@echo/firestore-functions/tasks/request-handlers/cancel-listing-request-handler'

export const cancelListing = onTaskDispatched<CancelListingTaskData>(cancelListingRequestHandler)
