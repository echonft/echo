import type { AbstractPath } from '@echo/api/routing/abstract-path'
import { pathProvider } from '@echo/api/routing/path-provider'
import type { QueryParams } from '@echo/api/types/routing/query-params/query-params'
import type { SearchParams } from '@echo/api/types/routing/search-params/search-params'
import { filter, flatten, map, pipe, propEq, values } from 'ramda'

export function isPathSecure(path: string) {
  const securePaths = pipe(
    values,
    map(values),
    flatten,
    filter(propEq(true, 'secure'))
  )(pathProvider) as unknown as AbstractPath<QueryParams, SearchParams>[]
  for (const securePath of securePaths) {
    if (securePath.test(path)) {
      return true
    }
  }
  return false
}
