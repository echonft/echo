import type { QueryWithConstraints } from '@echo/firestore/types/query/query-with-constraints'
import { isNil } from 'ramda'

export function addLimitConstraint<T>(args: QueryWithConstraints<T>) {
  if (isNil(args.constraints) || isNil(args.constraints.limit)) {
    return args
  }
  const { query, constraints } = args
  return {
    query: query.limit(args.constraints.limit),
    constraints
  }
}
