import { eqListWith } from '@echo/utils/fp/eq-list-with'
import { equals, isNil } from 'ramda'

function internalFn<T>(listA: T[]): (listB: T[]) => boolean {
  return function (listB: T[]): boolean {
    return eqListWith<T>(equals, listA, listB)
  }
}

export function eqList<T>(listA: T[]): (listB: T[]) => boolean
export function eqList<T>(listA: T[], listB: T[]): boolean
export function eqList<T>(listA: T[], listB?: T[]): boolean | ((listB: T[]) => boolean) {
  if (isNil(listB)) {
    return internalFn(listA)
  }
  return internalFn(listA)(listB)
}
