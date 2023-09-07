import { addExpiresAtToSelectConstraint } from './add-expires-at-to-select-constraint'
import { addLimitConstraint } from './add-limit-constraint'
import { addLimitToLastConstraint } from './add-limit-to-last-constraint'
import { addOffsetConstraint } from './add-offset-constraint'
import { addOrderByConstraint } from './add-order-by-constraint'
import { addSelectConstraint } from './add-select-constraint'
import { QueryConstraints } from '@echo/firestore-types'
import { Query } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export function addConstraintsToQuery<T>(
  query: Query<T>,
  constraints: QueryConstraints | undefined,
  availableFields?: string[],
  validateExpiresAt?: boolean
) {
  if (isNil(constraints)) {
    return query
  }
  if (validateExpiresAt) {
    constraints = addExpiresAtToSelectConstraint(constraints)
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
