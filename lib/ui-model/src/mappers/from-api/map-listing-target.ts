import { ListingTarget } from '../../types/listing-target'
import { mapNftCollection } from './map-nft-collection'
import { ListingTargetResponse } from '@echo/api'
import { modify } from 'ramda'

export function mapListingTarget(response: ListingTargetResponse): ListingTarget {
  return modify('collection', mapNftCollection, response)
}
