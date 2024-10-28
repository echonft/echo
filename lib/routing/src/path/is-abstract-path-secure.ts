import type { AbstractPath } from '@echo/routing/path/abstract-path'
import type { PathString } from '@echo/routing/types/path-string'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import { filter, propEq } from 'ramda'

export function isAbstractPathSecure(
  path: PathString,
  paths: AbstractPath<Record<PropertyKey, string | string[]>, QueryParams, SearchParams>[]
) {
  const securePaths = filter(propEq(true, 'secure'), paths)
  for (const securePath of securePaths) {
    if (securePath.test(path)) {
      return true
    }
  }
  return false
}
