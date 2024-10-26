import type { Filter } from '@echo/ui/types/filter'
import { eqProps, isNil } from 'ramda'

function innerEqFilter<T extends Filter>(objA: T) {
  return function (objB: T): boolean {
    return eqProps('id', objA, objB)
  }
}

export function eqFilter<T extends Filter>(objA: T): (objB: T) => boolean
export function eqFilter<T extends Filter>(objA: T, objB: T): boolean
export function eqFilter<T extends Filter>(objA: T, objB?: T): ((objB: T) => boolean) | boolean {
  if (isNil(objB)) {
    return innerEqFilter(objA)
  }
  return innerEqFilter(objA)(objB)
}
