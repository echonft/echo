import { toggleSelectionInList } from '@echo/ui/helpers/selection/toggle-selection-in-list'
import { type Group } from '@echo/ui/types/group'
import { type Selectable } from '@echo/ui/types/selectable'
import { isNil, map, modify, propEq, when } from 'ramda'

function internalFn<T extends Selectable>(groupId: string, comparator: (obj: T) => boolean) {
  return function (groups: Group<T>[]) {
    return map<Group<T>, Group<T>>(
      when<Group<T>, Group<T>>(propEq(groupId, 'id'), modify('items', toggleSelectionInList<T>(comparator))),
      groups
    )
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
