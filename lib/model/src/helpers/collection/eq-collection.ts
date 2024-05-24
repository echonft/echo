import type { Collection } from '@echo/model/types/collection'
import { equals, isNil } from 'ramda'

function internalFn(collectionA: Collection): (collectionB: Collection) => boolean {
  return function (collectionB: Collection) {
    return equals(collectionA.slug, collectionB.slug)
  }
}

export function eqCollection(collectionA: Collection, collectionB: Collection): boolean
export function eqCollection(collectionA: Collection): (collectionB: Collection) => boolean
export function eqCollection(
  collectionA: Collection,
  collectionB?: Collection
): boolean | ((collectionB: Collection) => boolean) {
  if (isNil(collectionB)) {
    return internalFn(collectionA)
  }
  return internalFn(collectionA)(collectionB)
}
