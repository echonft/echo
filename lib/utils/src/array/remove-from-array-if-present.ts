import { reject } from 'ramda'

export const removeFromArrayIfPresent = <T>(
  array: T[],
  toRemove: T,
  equals: (source: T) => (target: T) => boolean
): T[] => reject(equals(toRemove))(array)
