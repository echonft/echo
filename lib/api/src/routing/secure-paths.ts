import type { Path } from '@echo/api/routing/path'
import { pathProvider } from '@echo/api/routing/path-provider'
import { filter, flatten, map, pipe, propEq, values } from 'ramda'

export const securePaths = pipe<[typeof pathProvider], Record<string, Path>[], Path[][], Path[], Path[]>(
  values,
  map(values),
  flatten,
  filter(propEq(true, 'secure'))
)(pathProvider)
