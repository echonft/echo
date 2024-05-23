import type { WithId } from '@echo/model/types/with-id'
import { eqProps, isNil } from 'ramda'

function internalFn<T extends WithId>(objA: T) {
  return function (objB: T): boolean {
    return eqProps('id', objA, objB)
  }
}

export function eqWithId<T extends WithId>(objA: T): (objB: T) => boolean
export function eqWithId<T extends WithId>(objA: T, objB: T): boolean
export function eqWithId<T extends WithId>(objA: T, objB?: T): ((objB: T) => boolean) | boolean {
  if (isNil(objB)) {
    return internalFn(objA)
  }
  return internalFn(objA)(objB)
}
