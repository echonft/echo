import { type Selectable } from '@echo/ui/types/selectable'
import { assoc } from 'ramda'

export function disableSelection<T>(obj: Selectable<T>): Selectable<T> {
  return assoc('selectionDisabled', true, obj) as Selectable<T>
}
