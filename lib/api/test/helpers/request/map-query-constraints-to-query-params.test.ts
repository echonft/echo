import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import type { QueryConstraintsQueryParams } from '@echo/api/types/requests/params/query-constraints-query-params'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Collection } from '@echo/model/types/collection'
import { describe, expect, test } from '@jest/globals'
import { stringify } from 'qs'

describe('helpers - request - mapQueryConstraintsToQueryParams', () => {
  test('correctly maps the orderBy constraint', () => {
    const queryConstraints: QueryConstraints<Collection> = {
      orderBy: [
        { field: 'owner.discord.username', direction: 'asc' },
        { field: 'tokenId', direction: 'asc' }
      ]
    }
    const expected: QueryConstraintsQueryParams = {
      orderBy: ['owner.discord.username', 'asc', 'tokenId', 'asc']
    }
    const params = mapQueryConstraintsToQueryParams(queryConstraints)
    expect(params).toStrictEqual(expected)
    expect(stringify(params, { addQueryPrefix: true, arrayFormat: 'repeat', skipNulls: true })).toBe(
      '?orderBy=owner.discord.username&orderBy=asc&orderBy=tokenId&orderBy=asc'
    )
  })
})
