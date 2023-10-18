import { addExpiresAtToSelectConstraint } from '@echo/firestore/helpers/query/add-expires-at-to-select-constraint'
import { addLimitConstraint } from '@echo/firestore/helpers/query/add-limit-constraint'
import { addLimitToLastConstraint } from '@echo/firestore/helpers/query/add-limit-to-last-constraint'
import { addOffsetConstraint } from '@echo/firestore/helpers/query/add-offset-constraint'
import { addOrderByConstraint } from '@echo/firestore/helpers/query/add-order-by-constraint'
import { addSelectConstraint } from '@echo/firestore/helpers/query/add-select-constraint'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { type Query } from 'firebase-admin/lib/firestore'
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
