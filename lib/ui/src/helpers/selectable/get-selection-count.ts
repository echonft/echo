import { isSelected } from '@echo/ui/helpers/selectable/is-selected'
import { type Selectable } from '@echo/ui/types/selectable'
import { count } from 'ramda'

export function getSelectionCount<T extends Selectable>(list: T[]) {
  return count(isSelected, list)
}
