import type { CancelNftOffersTaskData } from '@echo/firestore-functions/tasks/cancel-nft-offers-task'
import { onTaskDispatched } from '@echo/firestore-functions/tasks/helpers/on-task-dispatched'
import { cancelNftOffersRequestHandler } from '@echo/firestore-functions/tasks/request-handlers/cancel-nft-offers-request-handler'

export const cancelNftOffers = onTaskDispatched<CancelNftOffersTaskData>(cancelNftOffersRequestHandler)
