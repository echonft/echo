import type { IncludeExpiredQueryFilter } from '@echo/firestore/types/query/include-expired-query-filter'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { dissoc, is, isNil, map, pipe, prop, reject } from 'ramda'

type ModelWithExpiredProp<T> = T & Record<'expired', boolean>

export function filterExpiredResults<T>(
  results: ModelWithExpiredProp<T>[],
  constraints: QueryConstraints | undefined,
  filters: IncludeExpiredQueryFilter | undefined
): Array<T> {
  let filteredResults = results
  // can't use a filter on expiration date with anything else in Firestore, so we filter them manually if needed
  if (isNil(filters?.includeExpired) || !filters?.includeExpired) {
    filteredResults = reject(prop<boolean>('expired'), results)
  }
  // if expiresAt was not in the select constraint, remove it from the results
  if (!isNil(constraints) && !isNil(constraints.select)) {
    const { select } = constraints
    if ((is(Array, select) && !select.includes('expiresAt')) || select !== 'expiresAt') {
      return map(pipe(dissoc('expiresAt'), dissoc('expired')), filteredResults) as Array<T>
    }
  }
  return filteredResults
}
