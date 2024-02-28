import { isSelected } from '@echo/ui/helpers/selectable/is-selected'
import { type Selectable } from '@echo/ui/types/selectable'
import { filter } from 'ramda'

export function getSelectionInList<T>(list: Selectable<T>[]): Selectable<T>[] {
  return filter(isSelected<T>, list)
}
