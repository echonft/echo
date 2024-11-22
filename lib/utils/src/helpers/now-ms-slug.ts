import { nowMs } from '@echo/utils/helpers/now-ms'
import { pipe, toLower, toString } from 'ramda'

export function nowMsSlug(): Lowercase<string> {
  return pipe(nowMs, toString, toLower<string>)()
}
