import { assertStateFilters } from '@echo/firestore/helpers/crud/assert-state-filters'
import type { StateQueryFilter } from '@echo/firestore/types/query/state-query-filter'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { errorMessage } from '@echo/utils/helpers/error-message'

export function guarded_assertStateFilters<T extends string, U extends StateQueryFilter<T>>(filters: U | undefined) {
  try {
    return assertStateFilters(filters)
  } catch (e) {
    throw new BadRequestError(errorMessage(e))
  }
}
