import type { AbstractPath } from '@echo/routing/path/abstract-path'
import { Path } from '@echo/routing/path/path'
import { providerPaths } from '@echo/routing/path/provider-paths'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import { describe, expect, test } from '@jest/globals'

describe('providerPathsTest', () => {
  test('returns the right array of paths', () => {
    const path1 = new Path<{ param1: string; param2: string }>({ path: '/path/:param1/:param2', secure: true })
    const path2 = new Path<never, { param1: string; param2: string }>({ path: '/my/path', secure: false })
    const path3 = new Path({ path: '/this/is/a/path', secure: false })
    const path4 = new Path<{ param1: string; param2: string }, { param3: string }>({
      path: '/another/path/:param1/:param2',
      secure: true
    })
    const provider = {
      a: {
        b: path1
      },
      c: {
        d: path2,
        e: path3
      },
      f: {
        g: path4
      }
    } as unknown as Record<
      string,
      Record<string, AbstractPath<Record<PropertyKey, string | string[]>, QueryParams, SearchParams>>
    >
    expect(providerPaths(provider)).toEqual([path1, path2, path3, path4])
  })
})
