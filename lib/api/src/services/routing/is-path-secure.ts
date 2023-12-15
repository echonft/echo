import { linkProvider } from '@echo/api/services/routing/link-provider'
import type { Path } from '@echo/api/services/routing/path'
import { filter, flatten, map, pipe, propEq, values } from 'ramda'

export function isPathSecure(path: string) {
  const securePaths = pipe<[typeof linkProvider], Record<string, Path>[], Path[][], Path[], Path[]>(
    values,
    map(values),
    flatten,
    filter(propEq(true, 'secure'))
  )(linkProvider)
  for (const securePath of securePaths) {
    if (securePath.test(path)) {
      return true
    }
  }
  return false
}
