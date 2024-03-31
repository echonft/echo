import { type Disableable } from '@echo/ui/types/disableable'
import { assoc } from 'ramda'

export function disable<T>(obj: Disableable<T>): Disableable<T> {
  return assoc('disabled', true, obj) as Disableable<T>
}
