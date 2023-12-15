import type { ApiRequest } from '@echo/api/types/api-request'
import { LISTING_FILTER_AS_ITEM, LISTING_FILTER_AS_TARGET } from '@echo/firestore/constants/listing/listing-filter-as'
import type { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { parseListingFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse-listing-filters-query'
import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_OPEN
} from '@echo/model/constants/listing-states'
import { NextRequest } from 'next/server'

describe('helpers - request - parseListingFiltersQuery - empty', () => {
  test('returns undefined if the URL does not have any filters', () => {
    const url = new URL('https://echo.xyz/')
    const request = new NextRequest(url) as ApiRequest<never>
    expect(parseListingFiltersQuery(request)).toBeUndefined()
  })
})

describe('helpers - request - parseListingFiltersQuery - as filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if as is not "receiver" or "sender"', () => {
    expect(() => parseListingFiltersQuery(getRequest('as=whatever'))).toThrow()
  })
  test('returns a filter with the correct as prop', () => {
    expect(parseListingFiltersQuery(getRequest(`as=${LISTING_FILTER_AS_ITEM}`))).toStrictEqual<ListingQueryFilters>({
      as: LISTING_FILTER_AS_ITEM
    })
  })
})

describe('helpers - request - parseListingFiltersQuery - state filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if state is not valid', () => {
    expect(() => parseListingFiltersQuery(getRequest('state=whatever'))).toThrow()
    expect(() => parseListingFiltersQuery(getRequest('state=accepted'))).toThrow()
    expect(() => parseListingFiltersQuery(getRequest(`state=${LISTING_STATE_CANCELLED}&state=notvalid`))).toThrow()
  })
  test('returns a filter with the correct state prop', () => {
    expect(parseListingFiltersQuery(getRequest(`state=${LISTING_STATE_CANCELLED}`))).toStrictEqual<ListingQueryFilters>(
      {
        state: [LISTING_STATE_CANCELLED]
      }
    )
    expect(
      parseListingFiltersQuery(getRequest(`state=${LISTING_STATE_CANCELLED}&state=${LISTING_STATE_FULFILLED}`))
    ).toStrictEqual<ListingQueryFilters>({
      state: [LISTING_STATE_CANCELLED, LISTING_STATE_FULFILLED]
    })
  })
})

describe('helpers - request - parseListingFiltersQuery - notState filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if notState is not valid', () => {
    expect(() => parseListingFiltersQuery(getRequest('notState=whatever'))).toThrow()
    expect(() => parseListingFiltersQuery(getRequest('notState=accepted'))).toThrow()
    expect(() => parseListingFiltersQuery(getRequest(`notState=${LISTING_STATE_CANCELLED}&state=notvalid`))).toThrow()
  })
  test('returns a filter with the correct notState prop', () => {
    expect(
      parseListingFiltersQuery(getRequest(`notState=${LISTING_STATE_CANCELLED}`))
    ).toStrictEqual<ListingQueryFilters>({
      notState: [LISTING_STATE_CANCELLED]
    })
    expect(
      parseListingFiltersQuery(getRequest(`notState=${LISTING_STATE_CANCELLED}&notState=${LISTING_STATE_FULFILLED}`))
    ).toStrictEqual<ListingQueryFilters>({
      notState: [LISTING_STATE_CANCELLED, LISTING_STATE_FULFILLED]
    })
  })
})

describe('helpers - request - parseListingFiltersQuery - includeExpired filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if includeExpired is not valid', () => {
    expect(() => parseListingFiltersQuery(getRequest('includeExpired=whatever'))).toThrow()
  })
  test('returns a filter with the correct includeExpired prop', () => {
    expect(parseListingFiltersQuery(getRequest('includeExpired=true'))).toStrictEqual<ListingQueryFilters>({
      includeExpired: true
    })
    expect(parseListingFiltersQuery(getRequest('includeExpired=false'))).toStrictEqual<ListingQueryFilters>({
      includeExpired: false
    })
  })
})

describe('helpers - request - parseListingFiltersQuery - multiple filters', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if there are both state and notState filters', () => {
    expect(() =>
      parseListingFiltersQuery(
        getRequest(
          `as=receiver&state=${LISTING_STATE_OPEN}&state=${LISTING_STATE_FULFILLED}&notState=${LISTING_STATE_CANCELLED}&includeExpired=true`
        )
      )
    ).toThrow()
  })
  test('returns the correct filters', () => {
    expect(
      parseListingFiltersQuery(
        getRequest(
          `as=${LISTING_FILTER_AS_TARGET}&state=${LISTING_STATE_OPEN}&state=${LISTING_STATE_FULFILLED}&includeExpired=true`
        )
      )
    ).toStrictEqual<ListingQueryFilters>({
      as: LISTING_FILTER_AS_TARGET,
      state: [LISTING_STATE_OPEN, LISTING_STATE_FULFILLED],
      includeExpired: true
    })
  })
})
