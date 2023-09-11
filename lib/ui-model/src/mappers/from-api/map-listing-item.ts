import { ListingItem } from '../../types/listing-item'
import { mapNft } from './map-nft'
import type { ListingItemResponse } from '@echo/api/types'
import { modify } from 'ramda'

export function mapListingItem(response: ListingItemResponse): ListingItem {
  return modify('nft', mapNft, response)
}
