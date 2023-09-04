import { QueryConstraintsQueryParams } from '../../types/request/query-constraints-query-params'
import { mapOrderByParametersToTuple } from './map-order-by-parameters-to-tuple'
import { QueryConstraints } from '@echo/firestore-types'
import { flatten, modify, pipe } from 'ramda'

export function mapQueryConstraintsToUrlQuery(constraints: QueryConstraints): QueryConstraintsQueryParams {
  return pipe(
    modify('orderBy', pipe(mapOrderByParametersToTuple, flatten))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  )(constraints)
}
