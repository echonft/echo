import type { ListingTargetResponse } from '@echo/api/types/responses/model/listing-target-response'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/firestore-listing-target'
import { mapNftCollection } from '@server/mappers/to-response/map-nft-collection'
import { modify } from 'ramda'

export function mapListingTarget(target: FirestoreListingTarget): ListingTargetResponse {
  return modify('collection', mapNftCollection, target)
}
