import type { AbstractPath } from '@echo/routing/path/abstract-path'
import { isAbstractPathSecure } from '@echo/routing/path/is-abstract-path-secure'
import { Path } from '@echo/routing/path/path'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import { describe, expect, test } from '@jest/globals'

describe('isAbstractPathSecure', () => {
  test('returns false if there are no paths', () => {
    expect(isAbstractPathSecure('/my/path', [])).toBeFalsy()
  })

  test('returns the correct secure value if the path matches one of the paths', () => {
    const paths = [
      new Path({ path: '/this/is/a/path', secure: false }),
      new Path<{ param1: string; param2: string }>({ path: '/path/:param1/:param2', secure: true }),
      new Path<never, { param1: string; param2: string }>({ path: '/my/path', secure: false }),
      new Path<{ param1: string; param2: string }, { param3: string }>({
        path: '/another/path/:param1/:param2',
        secure: true
      })
    ] as AbstractPath<Record<PropertyKey, string | string[]>, QueryParams, SearchParams>[]
    expect(isAbstractPathSecure('/no/match/path', paths)).toBeFalsy()
    expect(isAbstractPathSecure('/this/is/a/path', paths)).toBeFalsy()
    expect(isAbstractPathSecure('/path/1/2', paths)).toBeTruthy()
    expect(isAbstractPathSecure('/my/path?param1=1&param2=2', [])).toBeFalsy()
    expect(isAbstractPathSecure('/my/path', paths)).toBeFalsy()
    expect(isAbstractPathSecure('/another/path/1', paths)).toBeFalsy()
    expect(isAbstractPathSecure('/another/path/1/2', paths)).toBeTruthy()
    expect(isAbstractPathSecure('/another/path/1/2?param3=3', paths)).toBeTruthy()
  })
})
