import { addLimitConstraint } from '@echo/firestore/helpers/query/add-limit-constraint'
import { addOffsetConstraint } from '@echo/firestore/helpers/query/add-offset-constraint'
import { addOrderByConstraint } from '@echo/firestore/helpers/query/add-order-by-constraint'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { CollectionReference, Query } from 'firebase-admin/firestore'
import { pipe, prop } from 'ramda'

export function addConstraintsToQuery<T>(constraints: QueryConstraints<T> | undefined) {
  return function (query: CollectionReference<T> | Query<T>) {
    return pipe(addOrderByConstraint, addLimitConstraint, addOffsetConstraint, prop('query'))({ query, constraints })
  }
}
