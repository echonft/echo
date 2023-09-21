import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { head, path, pipe } from 'ramda'

export function getOfferItemsCollectionId(items: NonEmptyArray<FirestoreOfferItem>): string {
  return pipe(head, path(['nft', 'collection', 'id']))(items) as string
}
