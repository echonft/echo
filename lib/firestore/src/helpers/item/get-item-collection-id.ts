import type { ListingItem } from '@echo/model/types/listing-item'
import type { OfferItem } from '@echo/model/types/offer-item'
import { path } from 'ramda'

export function getItemCollectionId(item: OfferItem | ListingItem): string {
  return path(['nft', 'collection', 'id'], item)
}
