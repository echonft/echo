import type { ListingTargetResponse } from '@echo/api/types/responses/model/listing-target-response'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import { mapCollectionToResponse } from '@server/mappers/to-response/map-collection-to-response'
import { modify } from 'ramda'

export function mapListingTargetToResponse(target: FirestoreListingTarget): ListingTargetResponse {
  return modify('collection', mapCollectionToResponse, target)
}
