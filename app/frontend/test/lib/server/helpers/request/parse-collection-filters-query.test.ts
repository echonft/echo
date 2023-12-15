import type { ApiRequest } from '@echo/api/types/api-request'
import type { CollectionQueryFilters } from '@echo/firestore/types/query/collection-query-filters'
import { parseCollectionFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse-collection-filters-query'
import { NextRequest } from 'next/server'

describe('helpers - request - parseCollectionFiltersQuery - empty', () => {
  test('returns undefined if the URL does not have any filters', () => {
    const url = new URL('https://echo.xyz/')
    const request = new NextRequest(url) as ApiRequest<never>
    expect(parseCollectionFiltersQuery(request)).toBeUndefined()
  })
})

describe('helpers - request - parseCollectionFiltersQuery - includeSwapsCount filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if includeSwapsCount filter is invalid', () => {
    expect(() => parseCollectionFiltersQuery(getRequest('includeSwapsCount=whatever'))).toThrow()
  })
  test('returns a filter with the correct includeSwapsCount prop', () => {
    expect(parseCollectionFiltersQuery(getRequest('includeSwapsCount=true'))).toStrictEqual<CollectionQueryFilters>({
      includeSwapsCount: true
    })
    expect(parseCollectionFiltersQuery(getRequest('includeSwapsCount=false'))).toStrictEqual<CollectionQueryFilters>({
      includeSwapsCount: false
    })
  })
})
