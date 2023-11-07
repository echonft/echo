import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { type QueryConstraintsQueryParams } from '@echo/frontend/lib/types/request/query-constraints-query-params'
import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'
import { flatten, juxt, map, modify, pipe, prop, when } from 'ramda'

export function mapQueryConstraintsToQueryParams<T>(constraints: QueryConstraints<T>): QueryConstraintsQueryParams {
  return when<QueryConstraints<T>, QueryConstraintsQueryParams>(
    propIsNotNil('orderBy'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify(
      'orderBy',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pipe(map(juxt([prop('field'), prop('direction')])), flatten)
    )
  )(constraints) as QueryConstraintsQueryParams
}
