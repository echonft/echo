import type { ListingItem } from '@echo/model/types/listing-item'
import type { OfferItem } from '@echo/model/types/offer-item'
import { path } from 'ramda'

export function getItemId(item: OfferItem | ListingItem): string {
  return path(['nft', 'id'], item)
}
