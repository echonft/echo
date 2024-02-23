import { type Disableable } from '@echo/ui/types/disableable'
import { dissoc } from 'ramda'

export function enable<T extends Disableable>(obj: T): T {
  return dissoc('disabled', obj) as T
}
