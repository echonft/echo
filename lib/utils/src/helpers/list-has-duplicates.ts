import { complement, converge, equals, isNil, length, pipe, uniqWith } from 'ramda'

/**
 * Returns `true` if the list contains duplicate according to the equality predicate provided
 * @param pred
 * @returns {boolean}
 */
export function listHasDuplicates<T>(pred: (x: T, y: T) => boolean): (list: T[]) => boolean
export function listHasDuplicates<T>(pred: (x: T, y: T) => boolean, list: T[]): boolean
export function listHasDuplicates<T>(pred: (x: T, y: T) => boolean, list?: T[]): ((list: T[]) => boolean) | boolean {
  const predicate = converge(complement(equals), [pipe(uniqWith(pred), length), length])
  if (isNil(list)) {
    return predicate
  }
  return predicate(list)
}
