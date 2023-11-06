import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { has, isNil } from 'ramda'

export function assertQueryConsraints(constraints: QueryConstraints | undefined) {
  if (isNil(constraints)) {
    return undefined
  }
  if (has('limitToLast', constraints)) {
    if (has('limit', constraints)) {
      throw Error('limit and limitToLast query constraints are mutually exclusive')
    }
    if (!has('orderBy', constraints)) {
      throw Error('You must specify at least one orderBy clause for limitToLast queries')
    }
  }
  return constraints
}
