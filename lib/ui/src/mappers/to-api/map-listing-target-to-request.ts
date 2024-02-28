import type { ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import type { WithSlug } from '@echo/model/types/with-slug'
import type { Target } from '@echo/ui/types/target'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, modify, pick } from 'ramda'

export function mapListingTargetToRequest(target: Nullable<Target>): ListingTargetRequest {
  if (isNil(target)) {
    throw Error(`target is undefined`)
  }
  return modify<Target, 'collection', WithSlug>('collection', pick(['slug']), target)
}
