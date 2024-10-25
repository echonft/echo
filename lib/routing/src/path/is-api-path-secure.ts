import type { AbstractPath } from '@echo/routing/path/abstract-path'
import { apiPathProvider } from '@echo/routing/path/api-path-provider'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import { filter, flatten, map, pipe, propEq, values } from 'ramda'

export function isApiPathSecure(path: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const apiSecurePaths = pipe(
    values,
    map(values),
    flatten,
    filter(propEq(true, 'secure'))
  )(apiPathProvider) as AbstractPath<QueryParams, SearchParams>[]

  for (const securePath of apiSecurePaths) {
    if (securePath.test(path)) {
      return true
    }
  }
  return false
}
