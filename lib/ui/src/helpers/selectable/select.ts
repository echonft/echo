import { type Selectable } from '@echo/ui/types/selectable'
import { assoc } from 'ramda'

export function select<T>(obj: Selectable<T>): Selectable<T> {
  return assoc('selected', true, obj) as Selectable<T>
}
