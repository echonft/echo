import type { ListingItemRequest } from '@echo/api/types/requests/listing-item-request'
import type { OfferItemRequest } from '@echo/api/types/requests/offer-item-request'
import type { ListingItem } from '@echo/ui/types/model/listing-item'
import type { Nft } from '@echo/ui/types/model/nft'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import { map, modify, pick } from 'ramda'

export function mapItemsToRequests(items: OfferItem[] | ListingItem[]) {
  return map<OfferItem | ListingItem, OfferItemRequest | ListingItemRequest>(
    modify<'nft', Nft, Record<'id', string>>('nft', pick(['id'])),
    items
  )
}
