import type { ListingItemResponse } from '@echo/api/types/responses/model/listing-item-response'
import type { FirestoreListingItem } from '@echo/firestore/types/model/listing/firestore-listing-item'
import { mapNftToResponse } from '@server/mappers/to-response/map-nft-to-response'
import { modify } from 'ramda'

export function mapListingItemToResponse(item: FirestoreListingItem): ListingItemResponse {
  return modify('nft', mapNftToResponse, item)
}
