import { getGroupSelection } from '@echo/ui/helpers/selection/get-group-selection'
import { Group } from '@echo/ui/types/group'
import { Selectable } from '@echo/ui/types/selectable'
import { concat, map, reduce } from 'ramda'

export function getGroupsSelection<T extends Selectable>(groups: Group<T>[]): T[] {
  return reduce(concat, [], map(getGroupSelection, groups)) as T[]
}
