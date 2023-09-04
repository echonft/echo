import { addLimitConstraint } from './add-limit-constraint'
import { addLimitToLastConstraint } from './add-limit-to-last-constraint'
import { addOffsetConstraint } from './add-offset-constraint'
import { addOrderByConstraint } from './add-order-by-constraint'
import { addSelectConstraint } from './add-select-constraint'
import { QueryConstraints } from '@echo/firestore-types'
import { CollectionReference, Query } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export function addConstraintsToQuery<T>(
  query: CollectionReference<T> | Query<T>,
  constraints: QueryConstraints | undefined,
  availableFields?: string[]
) {
  if (isNil(constraints)) {
    return query
  }

  let queryWithConstraints = query
  const { select, orderBy, limit, limitToLast, offset } = constraints
  if (!isNil(select)) {
    if (isNil(availableFields)) {
      throw Error('availableFields is needed for select constraints')
    }
    queryWithConstraints = addSelectConstraint(queryWithConstraints, select, availableFields)
  }
  if (!isNil(orderBy)) {
    if (isNil(availableFields)) {
      throw Error('availableFields is needed for orderBy constraints')
    }
    queryWithConstraints = addOrderByConstraint(queryWithConstraints, orderBy, availableFields)
  }
  if (!isNil(limit)) {
    queryWithConstraints = addLimitConstraint(queryWithConstraints, limit)
  }
  if (!isNil(limitToLast)) {
    queryWithConstraints = addLimitToLastConstraint(queryWithConstraints, limitToLast)
  }
  if (!isNil(offset)) {
    queryWithConstraints = addOffsetConstraint(queryWithConstraints, offset)
  }
  return queryWithConstraints
}
