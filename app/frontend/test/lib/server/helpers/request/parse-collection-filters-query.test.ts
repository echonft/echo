import type { ApiRequest } from '@echo/api/types/api-request'
import { parseCollectionFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse-collection-filters-query'
import { parseListingFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse-listing-filters-query'
import type { CollectionQueryFilters } from '@echo/frontend/lib/server/types/request/collection-query-filters'
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
    expect(() => parseListingFiltersQuery(getRequest('includeSwapsCount=whatever'))).toThrow()
  })
  test('returns a filter with the correct includeSwapsCount prop', () => {
    expect(parseListingFiltersQuery(getRequest('includeSwapsCount=true'))).toStrictEqual<CollectionQueryFilters>({
      includeSwapsCount: true
    })
    expect(parseListingFiltersQuery(getRequest('includeSwapsCount=false'))).toStrictEqual<CollectionQueryFilters>({
      includeSwapsCount: false
    })
  })
})
