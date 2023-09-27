import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { isNil, map, path, pipe, reject, uniq } from 'ramda'

export function getOfferItemsCollectionIds(items: NonEmptyArray<FirestoreOfferItem>): string[] {
  return pipe(map(path(['nft', 'collection', 'id'])), reject(isNil), uniq<string>)(items)
}
