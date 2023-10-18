import { concat, find, isNil, pipe, when } from 'ramda'

export const addToArrayIfNotPresent = <T>(array: T[], toAdd: T, equals: (source: T) => (target: T) => boolean): T[] =>
  when<T[], T[]>(pipe(find(equals(toAdd)), isNil), concat([toAdd]))(array)
