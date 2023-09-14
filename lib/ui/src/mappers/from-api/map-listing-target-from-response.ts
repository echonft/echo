import type { ListingTargetResponse } from '@echo/api/types/responses/model/listing-target-response'
import { mapCollectionFromResponse } from '@echo/ui/mappers/from-api/map-collection-from-response'
import type { ListingTarget } from '@echo/ui/types/model/listing-target'
import { modify } from 'ramda'

export function mapListingTargetFromResponse(response: ListingTargetResponse): ListingTarget {
  return modify('collection', mapCollectionFromResponse, response)
}
