import { type Selectable } from '@echo/ui/types/selectable'
import { dissoc } from 'ramda'

export function unselect<T>(obj: Selectable<T>): Selectable<T> {
  return dissoc('selected', obj) as Selectable<T>
}
