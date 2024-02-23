import { isSelected } from '@echo/ui/helpers/selectable/is-selected'
import { type Selectable } from '@echo/ui/types/selectable'
import { filter } from 'ramda'

export function getSelectionInList<T extends Selectable>(list: T[]): T[] {
  return filter(isSelected<T>, list)
}
