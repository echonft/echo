import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { isNil, map, pick } from 'ramda'

export function pickSelectConstraintFieldsFromResults<T>(constraints: QueryConstraints<T> | undefined) {
  return function (results: T[]) {
    if (!isNil(constraints) && !isNil(constraints.select)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return map(pick(constraints.select), results) as T[]
    }
    return results
  }
}
