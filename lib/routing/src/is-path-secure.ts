import type { AbstractPath } from '@echo/routing/abstract-path'
import { pathProvider } from '@echo/routing/path-provider'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import { filter, flatten, map, pipe, propEq, values } from 'ramda'

export function isPathSecure(path: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const securePaths = pipe(values, map(values), flatten, filter(propEq(true, 'secure')))(pathProvider) as AbstractPath<
    QueryParams,
    SearchParams
  >[]
  for (const securePath of securePaths) {
    if (securePath.test(path)) {
      return true
    }
  }
  return false
}
