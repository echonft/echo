import type { StateQueryFilter } from '@echo/firestore/types/query/state-query-filter'
import { both, has, includes, isNil } from 'ramda'

export function assertStateFilters<T extends string, U extends StateQueryFilter<T>>(validStates: readonly T[]) {
  return function (filters: U | undefined) {
    if (isNil(filters)) {
      return undefined
    }
    if (!isNil(filters.state)) {
      for (const state of filters.state) {
        if (!includes(state, validStates)) {
          throw Error(`${state} is not valid`)
        }
      }
    }
    if (!isNil(filters.notState)) {
      for (const state of filters.notState) {
        if (!includes(state, validStates)) {
          throw Error(`${state} is not valid`)
        }
      }
    }
    if (both(has('state'), has('notState'))(filters)) {
      throw Error('state and notState filters are mutually exclusive')
    }
    return filters
  }
}
