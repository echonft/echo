import type { WithSlug } from '@echo/model/types/with-slug'
import { eqProps, isNil } from 'ramda'

function internalFn<T extends WithSlug>(objA: T) {
  return function (objB: T): boolean {
    return eqProps('slug', objA, objB)
  }
}

export function withSlugEquals<T extends WithSlug>(objA: T): (objB: T) => boolean
export function withSlugEquals<T extends WithSlug>(objA: T, objB: T): boolean
export function withSlugEquals<T extends WithSlug>(objA: T, objB?: T): ((objB: T) => boolean) | boolean {
  if (isNil(objB)) {
    return internalFn(objA)
  }
  return internalFn(objA)(objB)
}
