import type { ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import type { Target } from '@echo/ui/types/target'
import { isNil, modify, pick } from 'ramda'

export function mapListingTargetToRequest(target: Target | undefined): ListingTargetRequest {
  if (isNil(target)) {
    throw Error(`target is undefined`)
  }
  return modify<Target, 'collection', Record<'slug', string>>('collection', pick(['slug']), target)
}
