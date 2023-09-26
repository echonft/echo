import { getOfferItemsCollectionIds } from '@echo/firestore/helpers/offer/get-offer-items-collection-ids'
import { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { concat, converge, pipe, prop, uniq } from 'ramda'

export function getOfferCollectionIds(offer: FirestoreOffer): string[] {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    converge(concat, [
      pipe(prop('receiverItems'), getOfferItemsCollectionIds),
      pipe(prop('senderItems'), getOfferItemsCollectionIds)
    ]),
    uniq<string>
  )(offer)
}
