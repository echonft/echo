import { type Disableable } from '@echo/ui/types/disableable'
import { propEq } from 'ramda'

export function isDisabled<T extends Disableable>(obj: T): obj is T & Record<'disabled', true> {
  return propEq(true, 'disabled', obj)
}
