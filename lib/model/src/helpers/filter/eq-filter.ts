import type { Filter } from '@echo/ui/types/filter'
import { eqProps, isNil } from 'ramda'

function internalFn<T extends Filter>(objA: T) {
  return function (objB: T): boolean {
    return eqProps('id', objA, objB)
  }
}

export function eqFilter<T extends Filter>(objA: T): (objB: T) => boolean
export function eqFilter<T extends Filter>(objA: T, objB: T): boolean
export function eqFilter<T extends Filter>(objA: T, objB?: T): ((objB: T) => boolean) | boolean {
  if (isNil(objB)) {
    return internalFn(objA)
  }
  return internalFn(objA)(objB)
}
