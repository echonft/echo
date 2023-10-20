import { type Disableable } from '@echo/ui/types/disableable'
import { assoc } from 'ramda'

export function disable<T extends Disableable>(obj: T) {
  return assoc('disabled', true, obj) as T
}
