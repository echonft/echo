import { complement, equals, length, pipe, uniq } from 'ramda'

export function hasDuplicates<T>(list: T[]): boolean {
  return pipe(uniq, length, complement(equals(list.length)))(list)
}
