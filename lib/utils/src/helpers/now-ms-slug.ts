import type { Slug } from '@echo/model/types/slug'
import { nowMs } from '@echo/utils/helpers/now-ms'
import { pipe, toLower, toString } from 'ramda'

export function nowMsSlug(): Slug {
  return pipe(nowMs, toString, toLower<string>)()
}
