import { OrderByParameters } from '../../types/abstract/order-by-parameters'
import { isIn } from '@echo/utils'
import { CollectionReference, OrderByDirection, Query } from 'firebase-admin/firestore'
import { filter, head, is, isEmpty, propSatisfies, tail } from 'ramda'

function addOrderByConstraintRecursive<T>(
  query: CollectionReference<T> | Query<T>,
  orderBy: {
    field: string
    direction?: OrderByDirection
  }[]
) {
  if (isEmpty(orderBy)) {
    return query
  }
  const { field, direction } = head(orderBy)!
  return addOrderByConstraintRecursive(query.orderBy(field, direction), tail(orderBy))
}

export function addOrderByConstraint<T>(
  query: CollectionReference<T> | Query<T>,
  orderBy: OrderByParameters | OrderByParameters[],
  availableFields: string[]
) {
  const validParameters = is(Array, orderBy)
    ? filter(propSatisfies(isIn(availableFields), 'field'), orderBy)
    : filter(propSatisfies(isIn(availableFields), 'field'), [orderBy])
  if (isEmpty(validParameters)) {
    return query
  }

  return addOrderByConstraintRecursive(query, validParameters)
}
