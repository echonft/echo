import type { IncludeExpiredQueryFilter } from '@echo/firestore/types/query/include-expired-query-filter'
import { isNil, prop, reject } from 'ramda'

export function filterExpiredResults<T extends IncludeExpiredQueryFilter, U extends Record<'expired', boolean>>(
  filters: T | undefined
) {
  return function (results: U[]) {
    if (isNil(filters) || isNil(filters.includeExpired) || !filters.includeExpired) {
      return reject(prop('expired') as (result: U) => boolean, results)
    }
    return results
  }
}
