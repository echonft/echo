import type { CancelOfferTaskData } from '@echo/firestore-functions/tasks/cancel-offer-task'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { pipe, prop } from 'ramda'

export async function cancelOfferRequestHandler(data: CancelOfferTaskData) {
  await pipe(prop('slug'), cancelOffer)(data)
}
