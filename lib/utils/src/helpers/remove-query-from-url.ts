import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function removeQueryFromUrl(url: Nullable<string>): Nullable<string> {
  if (isNil(url)) {
    return url
  }
  return url.replace(/\?.*$/, '')
}
