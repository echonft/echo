import { getSelection } from '@echo/ui/helpers/selection/get-selection'
import { Group } from '@echo/ui/types/group'
import { Selectable } from '@echo/ui/types/selectable'
import { pipe, prop } from 'ramda'

export function getGroupSelection<T extends Selectable>(group: Group<T>): T[] {
  return pipe(prop('items'), getSelection<T>)(group)
}
