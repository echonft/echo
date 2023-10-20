import { type ListingItemRequest } from '@echo/api/types/requests/listing-item-request'
import { type OfferItemRequest } from '@echo/api/types/requests/offer-item-request'
import { type ListingItem } from '@echo/model/types/listing-item'
import { type Nft } from '@echo/model/types/nft'
import { type OfferItem } from '@echo/model/types/offer-item'
import { map, modify, pick } from 'ramda'

export function mapItemsToRequests(items: OfferItem[] | ListingItem[]) {
  return map<OfferItem | ListingItem, OfferItemRequest | ListingItemRequest>(
    modify<'nft', Nft, Record<'id', string>>('nft', pick(['id'])),
    items
  )
}
