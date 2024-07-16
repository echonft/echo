import { apiPathProvider } from '@echo/api/routing/api/api-path-provider'
import type { Path } from '@echo/api/routing/path'
import { filter, flatten, map, pipe, propEq, values } from 'ramda'

export const apiSecurePaths = pipe<[typeof apiPathProvider], Record<string, Path>[], Path[][], Path[], Path[]>(
  values,
  map(values),
  flatten,
  filter(propEq(true, 'secure'))
)(apiPathProvider)
