import { partialRight, reduce, reject } from 'ramda'

export const removeFromArray = <T>(array: T[], toRemove: T, equals: (source: T) => (target: T) => boolean): T[] =>
  reject(equals(toRemove))(array)

export const removeArrayFromArray = <T>(
  array: T[],
  toRemove: T[],
  equals: (source: T) => (target: T) => boolean
): T[] => reduce(partialRight(removeFromArray, [equals]), array, toRemove)
