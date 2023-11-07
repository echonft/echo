import { type OrderByParameters } from '@echo/firestore/types/query/order-by-parameters'
import type { QueryWithConstraints } from '@echo/firestore/types/query/query-with-constraints'
import type { Query } from 'firebase-admin/firestore'
import { head, isEmpty, isNil, tail } from 'ramda'

function addOrderByConstraintRecursive<T>(query: Query<T>, orderBy: OrderByParameters[]) {
  if (isEmpty(orderBy)) {
    return query
  }
  const orderByParameter = head(orderBy)
  if (isNil(orderByParameter)) {
    return query
  }
  const { field, direction } = orderByParameter
  return addOrderByConstraintRecursive(query.orderBy(field, direction), tail(orderBy))
}

export function addOrderByConstraint<T>(args: QueryWithConstraints<T>) {
  if (isNil(args.constraints) || isNil(args.constraints.orderBy)) {
    return args
  }
  const { query, constraints } = args
  return {
    query: addOrderByConstraintRecursive(query, args.constraints.orderBy),
    constraints
  }
}
