import type { ListingTargetResponse } from '@echo/api/types/responses/model/listing-target-response'
import { mapNftCollection } from '@echo/ui/mappers/from-api/map-nft-collection'
import type { ListingTarget } from '@echo/ui/types/model/listing-target'
import { modify } from 'ramda'

export function mapListingTarget(response: ListingTargetResponse): ListingTarget {
  return modify('collection', mapNftCollection, response)
}
