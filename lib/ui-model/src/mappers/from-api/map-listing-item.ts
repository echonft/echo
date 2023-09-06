import { ListingItem } from '../../types/listing-item'
import { mapNft } from './map-nft'
import { ListingItemResponse } from '@echo/api'
import { modify } from 'ramda'

export function mapListingItem(response: ListingItemResponse): ListingItem {
  return modify('nft', mapNft, response)
}
