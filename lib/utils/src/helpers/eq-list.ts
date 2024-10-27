import { eqListWith } from '@echo/utils/helpers/eq-list-with'
import { equals, isNil } from 'ramda'

function innerEqList<T>(listA: T[]): (listB: T[]) => boolean {
  return function (listB: T[]): boolean {
    return eqListWith<T>(equals, listA, listB)
  }
}

export function eqList<T>(listA: T[]): (listB: T[]) => boolean
export function eqList<T>(listA: T[], listB: T[]): boolean
export function eqList<T>(listA: T[], listB?: T[]): boolean | ((listB: T[]) => boolean) {
  if (isNil(listB)) {
    return innerEqList(listA)
  }
  return innerEqList(listA)(listB)
}
