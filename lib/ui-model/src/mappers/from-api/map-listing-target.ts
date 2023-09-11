import { ListingTarget } from '../../types/listing-target'
import { mapNftCollection } from './map-nft-collection'
import type { ListingTargetResponse } from '@echo/api/types'
import { modify } from 'ramda'

export function mapListingTarget(response: ListingTargetResponse): ListingTarget {
  return modify('collection', mapNftCollection, response)
}
