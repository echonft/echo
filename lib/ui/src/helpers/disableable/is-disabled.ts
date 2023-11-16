import { type Disableable } from '@echo/ui/types/disableable'
import { has } from 'ramda'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function isDisabled<T extends Disableable>(obj: T): obj is Omit<T, 'disabled'> & Record<'disabled', true> {
  return has('disabled', obj)
}
