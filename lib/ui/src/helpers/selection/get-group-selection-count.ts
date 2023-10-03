import { getSelectionCount } from '@echo/ui/helpers/selection/get-selection-count'
import { Group } from '@echo/ui/types/group'
import { Selectable } from '@echo/ui/types/selectable'
import { pipe, prop } from 'ramda'

export function getGroupSelectionCount<T extends Selectable>(group: Group<T>) {
  return pipe(prop('items'), getSelectionCount<T>)(group)
}
