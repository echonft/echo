import type { WithVisiblity } from '@echo/ui/types/with-visiblity'
import { dissoc } from 'ramda'

export function show<T extends WithVisiblity>(obj: T): T {
  return dissoc('hidden', obj) as T
}
