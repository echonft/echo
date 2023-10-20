import { isSelected } from '@echo/ui/helpers/selection/is-selected'
import { type Selectable } from '@echo/ui/types/selectable'
import { filter } from 'ramda'

export function getSelection<T extends Selectable>(list: T[]): T[] {
  return filter(isSelected, list)
}
