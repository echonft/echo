import { ListingTarget } from '@echo/ui/types/model/listing-target'
import { isNil, modify, pick } from 'ramda'

export function mapListingTargetToRequest(target: ListingTarget | undefined) {
  if (isNil(target)) {
    throw Error(`target is undefined`)
  }
  return modify<ListingTarget, 'collection', Record<'id', string>>('collection', pick(['id']), target)
}
