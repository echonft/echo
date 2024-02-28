import { toggleSelection } from '@echo/ui/helpers/selectable/toggle-selection'
import { type Selectable } from '@echo/ui/types/selectable'
import { isNil, map, when } from 'ramda'

function internalFn<T>(comparator: (obj: Selectable<T>) => boolean) {
  return function (list: Selectable<T>[]): Selectable<T>[] {
    return map(when(comparator, toggleSelection), list)
  }
}

export function toggleSelectionInList<T>(
  comparator: (obj: Selectable<T>) => boolean
): (list: Selectable<T>[]) => Selectable<T>[]
export function toggleSelectionInList<T>(
  comparator: (obj: Selectable<T>) => boolean,
  list: Selectable<T>[]
): Selectable<T>[]
export function toggleSelectionInList<T>(
  comparator: (obj: Selectable<T>) => boolean,
  list?: Selectable<T>[]
): ((list: Selectable<T>[]) => Selectable<T>[]) | Selectable<T>[] {
  if (isNil(list)) {
    return internalFn<T>(comparator)
  }
  return internalFn<T>(comparator)(list)
}
