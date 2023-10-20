import { getItemCollectionId } from '@echo/model/helpers/item/get-item-collection-id'
import { type OfferItem } from '@echo/model/types/offer-item'
import { isNil, map, pipe, reject, uniq } from 'ramda'

export function getOfferItemsCollectionIds(items: OfferItem[]): string[] {
  return pipe(map(getItemCollectionId), reject(isNil), uniq<string>)(items)
}
