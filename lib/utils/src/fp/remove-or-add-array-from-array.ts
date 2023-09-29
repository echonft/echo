import { removeOrAddFromArray } from '@echo/utils/fp/remove-or-add-from-array'
import { head, isEmpty, tail, uniqWith } from 'ramda'

function removeOrAddArrayFromArrayRecursive<T>(
  list: T[],
  items: T[],
  comparator: (objA: never, objB: never) => boolean
): T[] {
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
  list: T[],
  items: T[],
  comparator: (objA: never, objB: never) => boolean
): T[] {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return removeOrAddArrayFromArrayRecursive<T>(list, uniqWith<T>(comparator, items), comparator)
}
