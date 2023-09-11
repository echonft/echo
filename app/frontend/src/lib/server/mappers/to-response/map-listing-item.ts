import type { ListingItemResponse } from '@echo/api/types'
import type { ListingItem } from '@echo/firestore-types'
import { mapNft } from '@server/mappers/to-response/map-nft'
import { modify } from 'ramda'

export function mapListingItem(item: ListingItem): ListingItemResponse {
  return modify('nft', mapNft, item)
}
