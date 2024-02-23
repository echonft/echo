import type { WithVisiblity } from '@echo/ui/types/with-visiblity'
import { assoc } from 'ramda'

export function hide<T extends WithVisiblity>(obj: T) {
  return assoc('hidden', true, obj) as T
}
