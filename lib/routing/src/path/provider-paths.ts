import type { AbstractPath } from '@echo/routing/path/abstract-path'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import { flatten, map, pipe, values } from 'ramda'

export function providerPaths(
  pathProvider: Record<
    string,
    Record<string, AbstractPath<Record<PropertyKey, string | string[]>, QueryParams, SearchParams>>
  >
): AbstractPath<Record<PropertyKey, string | string[]>, QueryParams, SearchParams>[] {
  return pipe(values, map(values), flatten)(pathProvider)
}
