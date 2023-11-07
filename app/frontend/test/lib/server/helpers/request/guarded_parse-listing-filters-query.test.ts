import type { ApiRequest } from '@echo/api/types/api-request'
import { ListingFilterAsItem, ListingFilterAsTarget } from '@echo/firestore/constants/listing-filter-as'
import type { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { guarded_parseListingFiltersQuery } from '@echo/frontend/lib/server/helpers/request/guarded_parse-listing-filters-query'
import { NextRequest } from 'next/server'

describe('helpers - request - guarded_parseListingFiltersQuery - empty', () => {
  test('returns undefined if the URL does not have any filters', () => {
    const url = new URL('https://echo.xyz/')
    const request = new NextRequest(url) as ApiRequest<never>
    expect(guarded_parseListingFiltersQuery(request)).toBeUndefined()
  })
})

describe('helpers - request - guarded_parseListingFiltersQuery - as filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if as is not "receiver" or "sender"', () => {
    expect(() => guarded_parseListingFiltersQuery(getRequest('as=whatever'))).toThrow()
  })
  test('returns a filter with the correct as prop', () => {
    expect(
      guarded_parseListingFiltersQuery(getRequest(`as=${ListingFilterAsItem}`))
    ).toStrictEqual<ListingQueryFilters>({
      as: ListingFilterAsItem
    })
  })
})

describe('helpers - request - guarded_parseListingFiltersQuery - state filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if state is not valid', () => {
    expect(() => guarded_parseListingFiltersQuery(getRequest('state=whatever'))).toThrow()
    expect(() => guarded_parseListingFiltersQuery(getRequest('state=accepted'))).toThrow()
    expect(() => guarded_parseListingFiltersQuery(getRequest('state=CANCELLED&state=notvalid'))).toThrow()
  })
  test('returns a filter with the correct state prop', () => {
    expect(guarded_parseListingFiltersQuery(getRequest('state=CANCELLED'))).toStrictEqual<ListingQueryFilters>({
      state: ['CANCELLED']
    })
    expect(
      guarded_parseListingFiltersQuery(getRequest('state=CANCELLED&state=FULFILLED'))
    ).toStrictEqual<ListingQueryFilters>({
      state: ['CANCELLED', 'FULFILLED']
    })
  })
})

describe('helpers - request - guarded_parseListingFiltersQuery - notState filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if notState is not valid', () => {
    expect(() => guarded_parseListingFiltersQuery(getRequest('notState=whatever'))).toThrow()
    expect(() => guarded_parseListingFiltersQuery(getRequest('notState=accepted'))).toThrow()
    expect(() => guarded_parseListingFiltersQuery(getRequest('notState=CANCELLED&state=notvalid'))).toThrow()
  })
  test('returns a filter with the correct notState prop', () => {
    expect(guarded_parseListingFiltersQuery(getRequest('notState=CANCELLED'))).toStrictEqual<ListingQueryFilters>({
      notState: ['CANCELLED']
    })
    expect(
      guarded_parseListingFiltersQuery(getRequest('notState=CANCELLED&notState=FULFILLED'))
    ).toStrictEqual<ListingQueryFilters>({
      notState: ['CANCELLED', 'FULFILLED']
    })
  })
})

describe('helpers - request - guarded_parseListingFiltersQuery - includeExpired filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if includeExpired is not valid', () => {
    expect(() => guarded_parseListingFiltersQuery(getRequest('includeExpired=whatever'))).toThrow()
  })
  test('returns a filter with the correct includeExpired prop', () => {
    expect(guarded_parseListingFiltersQuery(getRequest('includeExpired=true'))).toStrictEqual<ListingQueryFilters>({
      includeExpired: true
    })
    expect(guarded_parseListingFiltersQuery(getRequest('includeExpired=false'))).toStrictEqual<ListingQueryFilters>({
      includeExpired: false
    })
  })
})

describe('helpers - request - guarded_parseListingFiltersQuery - multiple filters', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if there are both state and notState filters', () => {
    expect(() =>
      guarded_parseListingFiltersQuery(
        getRequest('as=receiver&state=OPEN&state=ACCEPTED&notState=CANCELLED&includeExpired=true')
      )
    ).toThrow()
  })
  test('returns the correct filters', () => {
    expect(
      guarded_parseListingFiltersQuery(
        getRequest(`as=${ListingFilterAsTarget}&state=OPEN&state=FULFILLED&includeExpired=true`)
      )
    ).toStrictEqual<ListingQueryFilters>({
      as: ListingFilterAsTarget,
      state: ['OPEN', 'FULFILLED'],
      includeExpired: true
    })
  })
})
