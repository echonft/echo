import type { Collection } from '@echo/model/types/collection'
import { withSlugEquals } from '@echo/ui/comparators/with-slug-equals'
import { isNil, propSatisfies } from 'ramda'

function internalFn<T extends Record<'collection', Collection>, U extends Record<'collection', Collection>>(objA: T) {
  return function (objB: U): boolean {
    return propSatisfies(withSlugEquals(objB.collection), 'collection', objA)
  }
}

export function withCollectionEquals<
  T extends Record<'collection', Collection>,
  U extends Record<'collection', Collection>
>(objA: T): (objB: U) => boolean
export function withCollectionEquals<
  T extends Record<'collection', Collection>,
  U extends Record<'collection', Collection>
>(objA: T, objB: U): boolean
export function withCollectionEquals<
  T extends Record<'collection', Collection>,
  U extends Record<'collection', Collection>
>(objA: T, objB?: U): ((objB: U) => boolean) | boolean {
  if (isNil(objB)) {
    return internalFn(objA)
  }
  return internalFn(objA)(objB)
}
