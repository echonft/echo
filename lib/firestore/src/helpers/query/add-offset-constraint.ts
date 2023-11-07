import type { QueryWithConstraints } from '@echo/firestore/types/query/query-with-constraints'
import { isNil } from 'ramda'

export function addOffsetConstraint<T>(args: QueryWithConstraints<T>) {
  if (isNil(args.constraints) || isNil(args.constraints.offset)) {
    return args
  }
  const { query, constraints } = args
  return {
    query: query.offset(args.constraints.offset),
    constraints
  }
}
