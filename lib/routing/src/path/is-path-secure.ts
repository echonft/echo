import { pathProvider } from '@echo/routing/constants/path-provider'
import type { AbstractPath } from '@echo/routing/path/abstract-path'
import { isAbstractPathSecure } from '@echo/routing/path/is-abstract-path-secure'
import { providerPaths } from '@echo/routing/path/provider-paths'
import type { PathString } from '@echo/routing/types/path-string'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'

export function isPathSecure(path: PathString) {
  return isAbstractPathSecure(
    path,
    providerPaths(
      pathProvider as unknown as Record<
        string,
        Record<string, AbstractPath<Record<PropertyKey, string | string[]>, QueryParams, SearchParams>>
      >
    )
  )
}
