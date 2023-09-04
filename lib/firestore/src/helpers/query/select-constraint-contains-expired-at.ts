import { QueryConstraints } from '@echo/firestore-types'
import { is, isNil } from 'ramda'

export function selectConstraintContainsExpiredAt(constraints: QueryConstraints | undefined) {
  if (isNil(constraints) || isNil(constraints.select)) {
    return false
  }
  const { select } = constraints
  if (is(Array, select)) {
    return select?.includes('expiresAt')
  } else {
    return select == 'expiresAt'
  }
}
