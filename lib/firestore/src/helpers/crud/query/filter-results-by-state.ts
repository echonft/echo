import type { StateQueryFilter } from '@echo/firestore/types/query/state-query-filter'
import { isIn } from '@echo/utils/fp/is-in'
import { logger } from '@echo/utils/services/logger'
import { filter, isNil, pipe, prop, reject } from 'ramda'

export function filterResultsByState<T extends string, U extends StateQueryFilter<T>, V extends Record<'state', T>>(
  filters: U | undefined
) {
  return function (results: V[]) {
    logger.info(`filters ${JSON.stringify(filters)}`)
    for (const result of results) {
      logger.info(`result ${JSON.stringify(result)}`)
    }
    if (!isNil(filters)) {
      if (!isNil(filters.state)) {
        return filter(pipe(prop('state'), isIn(filters.state)), results)
      }
      if (!isNil(filters.notState)) {
        return reject(pipe(prop('state'), isIn(filters.notState)), results)
      }
    }
    return results
  }
}
