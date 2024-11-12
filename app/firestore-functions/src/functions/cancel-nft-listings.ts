import type { CancelNftListingsTaskData } from '@echo/firestore-functions/tasks/cancel-nft-listings-task'
import { onTaskDispatched } from '@echo/firestore-functions/tasks/helpers/on-task-dispatched'
import { cancelNftListingsRequestHandler } from '@echo/firestore-functions/tasks/request-handlers/cancel-nft-listings-request-handler'

export const cancelNftListings = onTaskDispatched<CancelNftListingsTaskData>(cancelNftListingsRequestHandler)
