import { eqListContentWith } from '@echo/utils/fp/eq-list-content-with'
import { equals, isNil } from 'ramda'

function internalFn<T>(listA: T[]): (listB: T[]) => boolean {
  return function (listB: T[]) {
    return eqListContentWith(equals)(listA, listB)
  }
}

export function eqListContent<T>(listA: T[], listB: T[]): boolean
export function eqListContent<T>(listA: T[]): (listB: T[]) => boolean
export function eqListContent<T>(listA: T[], listB?: T[]): boolean | ((listB: T[]) => boolean) {
  if (isNil(listB)) {
    return internalFn(listA)
  }
  return internalFn(listA)(listB)
}
