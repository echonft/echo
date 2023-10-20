import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { type QueryConstraintsQueryParams } from '@type/request/query-constraints-query-params'
import { always, anyPass, complement, flatten, has, ifElse, juxt, map, modify, pipe, prop, unless } from 'ramda'

export function mapQueryConstraintsToQueryParams(constraints: QueryConstraints): QueryConstraintsQueryParams {
  return unless<QueryConstraints, QueryConstraintsQueryParams>(
    anyPass([complement(has('orderBy')), propIsNil('orderBy')]),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify(
      'orderBy',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pipe(map(juxt([prop('field'), ifElse(has('direction'), prop('direction'), always('asc'))])), flatten)
    )
  )(constraints) as QueryConstraintsQueryParams
}
