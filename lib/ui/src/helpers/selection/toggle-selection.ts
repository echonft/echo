import { isSelected } from '@echo/ui/helpers/selection/is-selected'
import { Selectable } from '@echo/ui/types/selectable'
import { assoc, dissoc } from 'ramda'

export function toggleSelection<T extends Selectable>(obj: T): T {
  if (isSelected(obj)) {
    return dissoc('selected', obj) as T
  }
  return assoc('selected', true, obj) as T
}
