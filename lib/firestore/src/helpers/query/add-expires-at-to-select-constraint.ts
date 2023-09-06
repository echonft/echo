import { selectConstraintContainsExpiredAt } from './select-constraint-contains-expired-at'
import { QueryConstraints } from '@echo/firestore-types'
import { is, isNil } from 'ramda'

export function addExpiresAtToSelectConstraint(
  constraints: QueryConstraints | undefined
): QueryConstraints | undefined {
  if (!isNil(constraints) && !isNil(constraints.select) && !selectConstraintContainsExpiredAt(constraints)) {
    const { select } = constraints
    if (is(Array, select)) {
      if (select.includes('expiresAt')) {
        return constraints
      }
      ;(constraints.select as string[]).push('expiresAt')
      return constraints
    } else {
      if (constraints.select != 'expiresAt') {
        return {
          ...constraints,
          select: [constraints.select as string, 'expiresAt']
        }
      }
      return constraints
    }
  }
  return constraints
}
