import { QueryConstraintsQueryParams } from '../../types/request/query-constraints-query-params'
import { OrderByParameters, QueryConstraints } from '@echo/firestore-types'
import { flatten, modify, pipe } from 'ramda'

function mapOrderByParametersToTuple(params: OrderByParameters) {
  return [params.field, params.direction ?? 'asc']
}

export function mapQueryConstraintsToQueryParams(constraints: QueryConstraints): QueryConstraintsQueryParams {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return modify('orderBy', pipe(mapOrderByParametersToTuple, flatten), constraints)
}
