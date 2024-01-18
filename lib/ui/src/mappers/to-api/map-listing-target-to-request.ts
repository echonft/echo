import type { Target } from '@echo/ui/types/target'
import { isNil, modify, pick } from 'ramda'

export function mapListingTargetToRequest(target: Target | undefined) {
  if (isNil(target)) {
    throw Error(`target is undefined`)
  }
  return modify<Target, 'collection', Record<'id', string>>('collection', pick(['id']), target)
}
