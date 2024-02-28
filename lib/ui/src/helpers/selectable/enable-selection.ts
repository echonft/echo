import { type Selectable } from '@echo/ui/types/selectable'
import { dissoc } from 'ramda'

export function enableSelection<T>(obj: Selectable<T>): Selectable<T> {
  return dissoc('selectionDisabled', obj) as Selectable<T>
}
