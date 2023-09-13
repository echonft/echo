import type { ListingItemResponse } from '@echo/api/types/responses/model/listing-item-response'
import type { FirestoreListingItem } from '@echo/firestore/types/model/firestore-listing-item'
import { mapNft } from '@server/mappers/to-response/map-nft'
import { modify } from 'ramda'

export function mapListingItem(item: FirestoreListingItem): ListingItemResponse {
  return modify('nft', mapNft, item)
}
