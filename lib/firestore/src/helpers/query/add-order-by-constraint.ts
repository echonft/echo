import { type OrderByParameters } from '@echo/firestore/types/query/order-by-parameters'
import { isIn } from '@echo/utils/fp/is-in'
import { Query } from 'firebase-admin/firestore'
import { filter, head, isEmpty, isNil, propSatisfies, tail } from 'ramda'

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

export function addOrderByConstraint<T>(query: Query<T>, orderBy: OrderByParameters[], availableFields: string[]) {
  const validParameters = filter(propSatisfies(isIn(availableFields), 'field'), orderBy)
  if (isEmpty(validParameters)) {
    return query
  }
  return addOrderByConstraintRecursive(query, validParameters)
}
