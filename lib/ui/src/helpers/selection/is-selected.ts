import { type Selectable } from '@echo/ui/types/selectable'
import { has } from 'ramda'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function isSelected<T extends Selectable>(obj: T): obj is Omit<T, 'selected'> & Record<'selected', true> {
  return has('selected', obj)
}
