import type { ListingTargetResponse } from '@echo/api'
import type { ListingTarget } from '@echo/firestore-types'
import { mapNftCollection } from '@server/mappers/to-response/map-nft-collection'
import { modify } from 'ramda'

export function mapListingTarget(target: ListingTarget): ListingTargetResponse {
  return modify('collection', mapNftCollection, target)
}
