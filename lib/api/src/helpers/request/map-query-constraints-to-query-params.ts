import { type QueryConstraintsQueryParams } from '@echo/api/types/requests/params/query-constraints-query-params'
import type { OrderByParameters } from '@echo/firestore/types/query/order-by-parameters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { unlessPropIsNil } from '@echo/utils/fp/unless-prop-is-nil'
import { flatten, juxt, map, modify, pipe, prop } from 'ramda'

export function mapQueryConstraintsToQueryParams<T>(constraints: QueryConstraints<T>): QueryConstraintsQueryParams {
  return unlessPropIsNil<
    'orderBy',
    Omit<QueryConstraints<T>, 'select'> & Record<'select', string[] | undefined>,
    QueryConstraintsQueryParams
  >(
    'orderBy',
    modify<'orderBy', OrderByParameters[], string[]>(
      'orderBy',
      pipe(map(juxt([prop('field'), prop('direction')])), flatten)
    )
  )(
    constraints as Omit<QueryConstraints<T>, 'select'> & Record<'select', string[] | undefined>
  ) as QueryConstraintsQueryParams
}
