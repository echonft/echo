import { removeOrAddFromArray } from './remove-or-add-from-array'
import { head, isEmpty, tail, uniqWith } from 'ramda'

function removeOrAddArrayFromArrayRecursive<T>(
  list: Array<T>,
  items: Array<T>,
  comparator: (objA: never, objB: never) => boolean
): Array<T> {
  if (isEmpty(items)) {
    return list
  }
  return removeOrAddArrayFromArrayRecursive<T>(
    removeOrAddFromArray<T>(list, head(items) as T, comparator),
    tail(items),
    comparator
  )
}

export function removeOrAddArrayFromArray<T>(
  list: Array<T>,
  items: Array<T>,
  comparator: (objA: never, objB: never) => boolean
): Array<T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return removeOrAddArrayFromArrayRecursive<T>(list, uniqWith<T>(comparator, items), comparator)
}
