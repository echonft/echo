import { mapNftCollection } from './map-nft-collection'
import { ListingTargetResponse } from '@echo/api'
import { ListingTarget } from '@echo/firestore-types'
import { modify } from 'ramda'

export function mapListingTarget(target: ListingTarget): ListingTargetResponse {
  return modify('collection', mapNftCollection, target)
}
