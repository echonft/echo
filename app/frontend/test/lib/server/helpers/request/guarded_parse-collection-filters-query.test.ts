import type { ApiRequest } from '@echo/api/types/api-request'
import { guarded_parseCollectionFiltersQuery } from '@echo/frontend/lib/server/helpers/request/guarded_parse-collection-filters-query'
import type { CollectionQueryFilters } from '@echo/frontend/lib/server/types/request/collection-query-filters'
import { NextRequest } from 'next/server'

describe('helpers - request - guarded_parseCollectionFiltersQuery - empty', () => {
  test('returns undefined if the URL does not have any filters', () => {
    const url = new URL('https://echo.xyz/')
    const request = new NextRequest(url) as ApiRequest<never>
    expect(guarded_parseCollectionFiltersQuery(request)).toBeUndefined()
  })
})

describe('helpers - request - guarded_parseCollectionFiltersQuery - includeSwapsCount filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if includeSwapsCount filter is invalid', () => {
    expect(() => guarded_parseCollectionFiltersQuery(getRequest('includeSwapsCount=whatever'))).toThrow()
  })
  test('returns a filter with the correct includeSwapsCount prop', () => {
    expect(
      guarded_parseCollectionFiltersQuery(getRequest('includeSwapsCount=true'))
    ).toStrictEqual<CollectionQueryFilters>({
      includeSwapsCount: true
    })
    expect(
      guarded_parseCollectionFiltersQuery(getRequest('includeSwapsCount=false'))
    ).toStrictEqual<CollectionQueryFilters>({
      includeSwapsCount: false
    })
  })
})
