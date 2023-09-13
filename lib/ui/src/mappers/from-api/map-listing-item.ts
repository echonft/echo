import type { ListingItemResponse } from '@echo/api/types/responses/model/listing-item-response'
import { mapNft } from '@echo/ui/mappers/from-api/map-nft'
import type { ListingItem } from '@echo/ui/types/model/listing-item'
import { modify } from 'ramda'

export function mapListingItem(response: ListingItemResponse): ListingItem {
  return modify('nft', mapNft, response)
}
