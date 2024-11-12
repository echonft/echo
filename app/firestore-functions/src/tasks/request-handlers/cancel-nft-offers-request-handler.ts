import type { CancelNftOffersTaskData } from '@echo/firestore-functions/tasks/cancel-nft-offers-task'
import { cancelOfferTask } from '@echo/firestore-functions/tasks/cancel-offer-task'
import { enqueueTask } from '@echo/firestore-functions/tasks/helpers/enqueue-task'
import { getOffersForNft } from '@echo/firestore/crud/offer/get-offers-for-nft'
import { andThen, pipe } from 'ramda'

export async function cancelNftOffersRequestHandler(data: CancelNftOffersTaskData) {
  const offers = await getOffersForNft(data)
  for (const offer of offers) {
    await pipe(cancelOfferTask, andThen(enqueueTask))(offer)
  }
}
