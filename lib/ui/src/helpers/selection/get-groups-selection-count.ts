import { getGroupSelectionCount } from '@echo/ui/helpers/selection/get-group-selection-count'
import { Group } from '@echo/ui/types/group'
import { Selectable } from '@echo/ui/types/selectable'
import { add, map, reduce } from 'ramda'

export function getGroupsSelectionCount<T extends Selectable>(groups: Group<T>[]) {
  return reduce(add, 0, map(getGroupSelectionCount, groups))
}
