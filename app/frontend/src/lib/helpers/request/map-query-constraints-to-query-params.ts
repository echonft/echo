import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { QueryConstraintsQueryParams } from '@type/request/query-constraints-query-params'
import { always, flatten, has, ifElse, is, juxt, map, modify, pipe, prop } from 'ramda'

export function mapQueryConstraintsToQueryParams(constraints: QueryConstraints): QueryConstraintsQueryParams {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return modify(
    'orderBy',
    ifElse(
      is(Array),
      pipe(map(juxt([prop('field'), ifElse(has('direction'), prop('direction'), always('asc'))])), flatten),
      juxt([prop('field'), ifElse(has('direction'), prop('direction'), always('asc'))])
    ),
    constraints
  )
}
