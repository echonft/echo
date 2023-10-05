import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import { isNil, map, path, pipe, reject, uniq } from 'ramda'

export function getOfferItemsCollectionIds(items: FirestoreOfferItem[]): string[] {
  return pipe(map(path(['nft', 'collection', 'id'])), reject(isNil), uniq<string>)(items)
}
