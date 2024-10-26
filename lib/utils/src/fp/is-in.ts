import { includes, isNil } from 'ramda'

function innerIsIn<T>(list: readonly T[]) {
  return function (value: T) {
    return includes(value, list)
  }
}

export function isIn<T>(list: readonly T[]): (value: T) => boolean
export function isIn<T>(list: readonly T[], value: T): boolean
export function isIn<T>(list: readonly T[], value?: T): boolean | ((value: T) => boolean) {
  if (isNil(value)) {
    return innerIsIn<T>(list)
  }
  return innerIsIn<T>(list)(value)
}
