import type { ListingItemResponse } from '@echo/api/types/responses/model/listing-item-response'
import { mapNftFromResponse } from '@echo/ui/mappers/from-api/map-nft-from-response'
import type { ListingItem } from '@echo/ui/types/model/listing-item'
import { modify } from 'ramda'

export function mapListingItemFromResponse(response: ListingItemResponse): ListingItem {
  return modify('nft', mapNftFromResponse, response)
}
