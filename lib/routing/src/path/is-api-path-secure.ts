import { apiPathProvider } from '@echo/routing/constants/api-path-provider'
import type { AbstractPath } from '@echo/routing/path/abstract-path'
import { isAbstractPathSecure } from '@echo/routing/path/is-abstract-path-secure'
import { providerPaths } from '@echo/routing/path/provider-paths'
import type { PathString } from '@echo/routing/types/path-string'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'

export function isApiPathSecure(path: PathString) {
  return isAbstractPathSecure(
    path,
    providerPaths(
      apiPathProvider as unknown as Record<
        string,
        Record<string, AbstractPath<Record<PropertyKey, string | string[]>, QueryParams, SearchParams>>
      >
    )
  )
}
