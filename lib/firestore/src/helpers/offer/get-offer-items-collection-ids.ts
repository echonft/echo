import type { OfferItem } from '@echo/model/types/offer-item'
import { isNil, map, path, pipe, reject, uniq } from 'ramda'

export function getOfferItemsCollectionIds(items: OfferItem[]): string[] {
  return pipe(map(path(['nft', 'collection', 'id'])), reject(isNil), uniq<string>)(items)
}
