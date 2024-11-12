import type { CancelOfferTaskData } from '@echo/firestore-functions/tasks/cancel-offer-task'
import { onTaskDispatched } from '@echo/firestore-functions/tasks/helpers/on-task-dispatched'
import { cancelOfferRequestHandler } from '@echo/firestore-functions/tasks/request-handlers/cancel-offer-request-handler'

export const cancelOffer = onTaskDispatched<CancelOfferTaskData>(cancelOfferRequestHandler)
