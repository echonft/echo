import { getGroupSelection } from '@echo/ui/helpers/selection/get-group-selection'
import { type Group } from '@echo/ui/types/group'
import { type Selectable } from '@echo/ui/types/selectable'
import { concat, map, reduce } from 'ramda'

export function getGroupsSelection<T extends Selectable>(groups: Group<T>[]) {
  return reduce<T[], T[]>(concat, [], map(getGroupSelection, groups))
}
