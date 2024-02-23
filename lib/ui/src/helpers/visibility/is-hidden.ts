import type { WithVisiblity } from '@echo/ui/types/with-visiblity'
import { propEq } from 'ramda'

export function isHidden<T extends WithVisiblity>(obj: T): obj is T & Record<'hidden', true> {
  return propEq(true, 'hidden', obj)
}
