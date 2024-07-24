import type { OptionalRecord } from '@echo/utils/types/optional-record'
import { defaultTo, objOf, pipe, prop } from 'ramda'

export function fetchNftQueryMapper(
  params: OptionalRecord<'showAttribute', boolean>
): Record<'show_attribute', boolean> {
  return pipe(prop('showAttribute'), defaultTo(true), objOf('show_attribute'))(params)
}
