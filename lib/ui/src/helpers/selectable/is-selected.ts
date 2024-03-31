import { type Selectable } from '@echo/ui/types/selectable'
import { isNil } from 'ramda'

export function isSelected<T>(obj: Selectable<T>): obj is Selectable<T> & Record<'selected', true> {
  if (isNil(obj.selected)) {
    return false
  }
  return obj.selected
}
