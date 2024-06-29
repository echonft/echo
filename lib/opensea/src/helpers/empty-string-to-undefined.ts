import type { Nullable } from '@echo/utils/types/nullable'
import { isEmpty } from 'ramda'

export function emptyStringToUndefined(str: Nullable<string>) {
  if (isEmpty(str)) {
    return undefined
  }
  return str
}
