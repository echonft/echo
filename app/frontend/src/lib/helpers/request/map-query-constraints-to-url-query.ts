import { mapOrderByParametersToTuple } from './map-order-by-parameters-to-tuple'
import { QueryConstraints } from '@echo/firestore'
import { flatten, modify, pipe } from 'ramda'

export function mapQueryConstraintsToUrlQuery(constraints: QueryConstraints): {
  select?: string | string[]
  orderBy?: string[]
  limit?: number
  limitToLast?: number
  offset?: number
} {
  return pipe(
    modify('orderBy', pipe(mapOrderByParametersToTuple, flatten))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  )(constraints)
}
