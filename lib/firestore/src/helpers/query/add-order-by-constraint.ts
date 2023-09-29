import type { OrderByParameters } from '@echo/firestore/types/query/order-by-parameters'
import { isIn } from '@echo/utils/fp/is-in'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import type { Query } from 'firebase-admin/lib/firestore'
import { filter, head, isEmpty, propSatisfies, tail } from 'ramda'

function addOrderByConstraintRecursive<T>(query: Query<T>, orderBy: OrderByParameters[]) {
  if (isEmpty(orderBy)) {
    return query
  }
  const { field, direction } = head<OrderByParameters, OrderByParameters>(orderBy as NonEmptyArray<OrderByParameters>)
  return addOrderByConstraintRecursive(query.orderBy(field, direction), tail(orderBy))
}

export function addOrderByConstraint<T>(query: Query<T>, orderBy: OrderByParameters[], availableFields: string[]) {
  const validParameters = filter(propSatisfies(isIn(availableFields), 'field'), orderBy)
  if (isEmpty(validParameters)) {
    return query
  }
  return addOrderByConstraintRecursive(query, validParameters)
}
