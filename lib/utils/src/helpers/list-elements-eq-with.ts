import { equals, isNil, length, pipe, uniqWith } from 'ramda'

function innerListElementsEqWith<T>(pred: (x: T, y: T) => boolean): (list: T[]) => boolean {
  return function (list: T[]): boolean {
    return pipe(uniqWith(pred), length, equals(1))(list)
  }
}

export function listElementsEqWith<T>(pred: (x: T, y: T) => boolean, list: T[]): boolean
export function listElementsEqWith<T>(pred: (x: T, y: T) => boolean): (list: T[]) => boolean
export function listElementsEqWith<T>(pred: (x: T, y: T) => boolean, list?: T[]): boolean | ((list: T[]) => boolean) {
  if (isNil(list)) {
    return innerListElementsEqWith(pred)
  }
  return innerListElementsEqWith(pred)(list)
}
