import type { ExpireOfferTaskData } from '@echo/firestore-functions/tasks/expire-offer-task'
import { onTaskDispatched } from '@echo/firestore-functions/tasks/helpers/on-task-dispatched'
import { expireOfferTaskRequestHandler } from '@echo/firestore-functions/tasks/request-handlers/expire-offer-task-request-handler'

export const expireOffer = onTaskDispatched<ExpireOfferTaskData>(expireOfferTaskRequestHandler)
