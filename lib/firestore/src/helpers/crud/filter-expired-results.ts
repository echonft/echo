import type { IncludeExpiredQueryFilter } from '@echo/firestore/types/query/include-expired-query-filter'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { dissoc, isNil, map, pipe, prop, reject } from 'ramda'

type ModelWithExpiredProp<T> = T & Record<'expired', boolean>

export function filterExpiredResults<T>(
  results: ModelWithExpiredProp<T>[],
  constraints: QueryConstraints | undefined,
  filters: IncludeExpiredQueryFilter | undefined
): T[] {
  let filteredResults = results
  // can't use a filter on expiration date with anything else in Firestore, so we filter them manually if needed
  if (isNil(filters) || isNil(filters.includeExpired) || !filters.includeExpired) {
    filteredResults = reject<ModelWithExpiredProp<T>, ModelWithExpiredProp<T>[]>(prop('expired'), results)
  }
  // if expiresAt was not in the select constraint, remove it from the results
  if (!isNil(constraints) && !isNil(constraints.select)) {
    if (constraints.select.includes('expiresAt')) {
      return map(pipe(dissoc('expiresAt'), dissoc('expired')), filteredResults) as T[]
    }
  }
  return filteredResults
}
