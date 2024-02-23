import { toggleSelection } from '@echo/ui/helpers/selectable/toggle-selection'
import { type Selectable } from '@echo/ui/types/selectable'
import { isNil, map, when } from 'ramda'

function internalFn<T extends Selectable>(comparator: (obj: T) => boolean) {
  return function (list: T[]): T[] {
    return map(when(comparator, toggleSelection), list)
  }
}

export function toggleSelectionInList<T extends Selectable>(comparator: (obj: T) => boolean): (list: T[]) => T[]
export function toggleSelectionInList<T extends Selectable>(comparator: (obj: T) => boolean, list: T[]): T[]
export function toggleSelectionInList<T extends Selectable>(
  comparator: (obj: T) => boolean,
  list?: T[]
): ((list: T[]) => T[]) | T[] {
  if (isNil(list)) {
    return internalFn<T>(comparator)
  }
  return internalFn<T>(comparator)(list)
}
