import type { StateQueryFilter } from '@echo/firestore/types/query/state-query-filter'
import { both, has, isNil } from 'ramda'

export function assertStateFilters<T extends string, U extends StateQueryFilter<T>>(filters: U | undefined) {
  if (isNil(filters)) {
    return undefined
  }
  if (both(has('state'), has('notState'))(filters)) {
    throw Error('state and notState filters are mutually exclusive')
  }
  return filters
}
