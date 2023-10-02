import { Selectable } from '@echo/ui/types/selectable'
import { has } from 'ramda'

export function isSelected<T extends Selectable>(obj: T): obj is T & { selected: true } {
  return has('selected', obj)
}
