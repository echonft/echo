import { getSelection } from '@echo/ui/helpers/selection/get-selection'
import { type Group } from '@echo/ui/types/group'
import { type Selectable } from '@echo/ui/types/selectable'
import { pipe, prop } from 'ramda'

export function getGroupSelection<T extends Selectable>(group: Group<T>) {
  return pipe(prop('items'), getSelection<T>)(group)
}
