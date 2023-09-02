import { mapFieldToString } from './map-field-to-string'
import { mapOrderByParametersToTuple } from './map-order-by-parameters-to-tuple'
import { QueryConstraints } from '@echo/firestore/src/types/abstract/query-constraints'
import { ifElse, is, map, modify, pipe } from 'ramda'

export function mapQueryConstraintsToUrlQuery(constraints: QueryConstraints): {
  select?: string | string[]
  orderBy?: string[]
  limit?: number
  limitToLast?: number
  offset?: number
} {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('select', ifElse(is(Array), map(mapFieldToString), mapFieldToString)),
    // FIXME won't work if orderBy is an array
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('orderBy', mapOrderByParametersToTuple)
  )(constraints)
}
