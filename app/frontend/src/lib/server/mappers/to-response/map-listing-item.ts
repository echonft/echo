import { mapNft } from './map-nft'
import { ListingItemResponse } from '@echo/api'
import { ListingItem } from '@echo/firestore-types'
import { modify } from 'ramda'

export function mapListingItem(item: ListingItem): ListingItemResponse {
  return modify('nft', mapNft, item)
}
