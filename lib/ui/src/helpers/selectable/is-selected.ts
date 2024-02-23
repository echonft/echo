import { type Selectable } from '@echo/ui/types/selectable'
import { propEq } from 'ramda'

export function isSelected<T extends Selectable>(obj: T): obj is T & Record<'selected', true> {
  return propEq(true, 'selected', obj)
}
