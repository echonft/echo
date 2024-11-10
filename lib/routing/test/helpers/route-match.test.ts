import { routeMatch } from '@echo/routing/helpers/route-match'
import { FrontendRoute } from '@echo/routing/services/frontend/frontend-route'
import type { Route } from '@echo/routing/services/route'
import type { Path } from '@echo/routing/types/path'
import type { RouteParams, RouteQueryParams, RouteSearchParams } from '@echo/routing/types/route'
import { describe, expect, test } from '@jest/globals'
import { forEach, identity } from 'ramda'

describe('routeMatch', () => {
  const routes = [
    new FrontendRoute<never>('/this/is/a/path', false),
    new FrontendRoute<{ param1: string; param2: string }>('/path/:param1/:param2', true),
    new FrontendRoute<never, { param1: string; param2: string }>('/my/path', false, identity),
    new FrontendRoute<{ param1: string; param2: string }, { param3: string }>(
      '/another/path/:param1/:param2',
      true,
      identity
    )
  ] as Route<RouteParams, RouteQueryParams, RouteSearchParams>[]

  test('returns null is there are no matching frontend routes', () => {
    const noMatchPaths = [
      '/no/match/path',
      '/',
      '/invalid/path',
      '/path',
      '/path/param1',
      '/another/path',
      '/another/path/param1'
    ] as Path[]
    forEach((path) => {
      expect(routeMatch(routes)(path)).toBeUndefined()
    }, noMatchPaths)
  })

  test('returns the correct secure value if the path matches one of the paths', () => {
    const matchPaths = ['/this/is/a/path', '/my/path', '/path/param1/param2', '/another/path/param1/param2'] as Path[]
    forEach((path) => {
      expect(routeMatch(routes)(path)).toBeDefined()
    }, matchPaths)
  })
})
