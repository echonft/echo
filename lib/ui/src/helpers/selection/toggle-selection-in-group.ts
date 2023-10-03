import { toggleSelectionInList } from '@echo/ui/helpers/selection/toggle-selection-in-list'
import { Group } from '@echo/ui/types/group'
import { Selectable } from '@echo/ui/types/selectable'
import { isNil, map, modify, propEq, when } from 'ramda'

function internalFn<T extends Selectable>(groupId: string, comparator: (obj: T) => boolean) {
  return function (groups: Group<T>[]) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return map(when(propEq(groupId, 'id'), modify('items', toggleSelectionInList(comparator))), groups) as Group<T>[]
  }
}

export function toggleSelectionInGroup<T extends Selectable>(
  groupId: string,
  comparator: (obj: T) => boolean
): (groups: Group<T>[]) => Group<T>[]
export function toggleSelectionInGroup<T extends Selectable>(
  groupId: string,
  comparator: (obj: T) => boolean,
  groups: Group<T>[]
): Group<T>[]
export function toggleSelectionInGroup<T extends Selectable>(
  groupId: string,
  comparator: (obj: T) => boolean,
  groups?: Group<T>[]
): ((groups: Group<T>[]) => Group<T>[]) | Group<T>[] {
  if (isNil(groups)) {
    return internalFn<T>(groupId, comparator)
  }
  return internalFn<T>(groupId, comparator)(groups)
}
