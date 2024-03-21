import { getItemCollectionId } from '@echo/model/helpers/item/get-item-collection-id'
import { type OfferItem } from '@echo/model/types/offer-item'
import { map, pipe, uniq } from 'ramda'

export function getOfferItemsCollectionIds(items: OfferItem[]): string[] {
  return pipe(map(getItemCollectionId), uniq<string>)(items)
}
