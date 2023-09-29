import { concat, findIndex, partial, remove } from 'ramda'

export function removeOrAddFromArray<T>(list: T[], item: T, comparator: (objA: never, objB: never) => boolean): T[] {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const pred = partial(comparator, [item]) as (obj: T) => boolean
  const index = findIndex(pred, list)
  if (index === -1) {
    return concat(list, [item])
  }
  return remove(index, 1, list)
}
