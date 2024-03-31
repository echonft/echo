import { type Disableable } from '@echo/ui/types/disableable'
import { dissoc } from 'ramda'

export function enable<T>(obj: Disableable<T>): Disableable<T> {
  return dissoc('disabled', obj) as Disableable<T>
}
