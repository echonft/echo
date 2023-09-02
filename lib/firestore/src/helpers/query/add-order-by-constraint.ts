import { Field } from '../../types/abstract/field'
import { OrderByParameters } from '../../types/abstract/order-by-parameters'
import { mapFieldToFieldPath } from './map-field-to-field-path'
import { isIn } from '@echo/utils'
import { CollectionReference, FieldPath, OrderByDirection, Query } from 'firebase-admin/firestore'
import { filter, head, is, isEmpty, map, modify, propSatisfies, tail } from 'ramda'

function addOrderByConstraintRecursive<T>(
  query: CollectionReference<T> | Query<T>,
  orderBy: {
    field: string | FieldPath
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
  availableFields: Field[]
) {
  const validParameters = is(Array, orderBy)
    ? filter(propSatisfies(isIn(availableFields), 'field'), orderBy)
    : filter(propSatisfies(isIn(availableFields), 'field'), [orderBy])
  if (isEmpty(validParameters)) {
    return query
  }
  return addOrderByConstraintRecursive(query, map(modify('field', mapFieldToFieldPath), validParameters))
}
