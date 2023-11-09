import type { ApiRequest } from '@echo/api/types/api-request'
import { OFFER_FILTER_AS_RECEIVER } from '@echo/firestore/constants/offer/offer-filter-as'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { parseOfferFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse_offer_filters_query'
import { NextRequest } from 'next/server'

describe('helpers - request - parseOfferFiltersQuery - empty', () => {
  test('returns undefined if the URL does not have any filters', () => {
    const url = new URL('https://echo.xyz/')
    const request = new NextRequest(url) as ApiRequest<never>
    expect(parseOfferFiltersQuery(request)).toBeUndefined()
  })
})

describe('helpers - request - parseOfferFiltersQuery - as filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if as is not "receiver" or "sender"', () => {
    expect(() => parseOfferFiltersQuery(getRequest('as=whatever'))).toThrow()
  })
  test('returns a filter with the correct as prop', () => {
    expect(parseOfferFiltersQuery(getRequest(`as=${OFFER_FILTER_AS_RECEIVER}`))).toStrictEqual<OfferQueryFilters>({
      as: OFFER_FILTER_AS_RECEIVER
    })
  })
})

describe('helpers - request - parseOfferFiltersQuery - state filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if state is not valid', () => {
    expect(() => parseOfferFiltersQuery(getRequest('state=whatever'))).toThrow()
    expect(() => parseOfferFiltersQuery(getRequest('state=accepted'))).toThrow()
    expect(() => parseOfferFiltersQuery(getRequest('state=CANCELLED&state=notvalid'))).toThrow()
  })
  test('returns a filter with the correct state prop', () => {
    expect(parseOfferFiltersQuery(getRequest('state=CANCELLED'))).toStrictEqual<OfferQueryFilters>({
      state: ['CANCELLED']
    })
    expect(parseOfferFiltersQuery(getRequest('state=CANCELLED&state=ACCEPTED'))).toStrictEqual<OfferQueryFilters>({
      state: ['CANCELLED', 'ACCEPTED']
    })
  })
})

describe('helpers - request - parseOfferFiltersQuery - notState filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if notState is not valid', () => {
    expect(() => parseOfferFiltersQuery(getRequest('notState=whatever'))).toThrow()
    expect(() => parseOfferFiltersQuery(getRequest('notState=accepted'))).toThrow()
    expect(() => parseOfferFiltersQuery(getRequest('notState=CANCELLED&state=notvalid'))).toThrow()
  })
  test('returns a filter with the correct notState prop', () => {
    expect(parseOfferFiltersQuery(getRequest('notState=CANCELLED'))).toStrictEqual<OfferQueryFilters>({
      notState: ['CANCELLED']
    })
    expect(parseOfferFiltersQuery(getRequest('notState=CANCELLED&notState=ACCEPTED'))).toStrictEqual<OfferQueryFilters>(
      {
        notState: ['CANCELLED', 'ACCEPTED']
      }
    )
  })
})

describe('helpers - request - parseOfferFiltersQuery - includeExpired filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if includeExpired is not valid', () => {
    expect(() => parseOfferFiltersQuery(getRequest('includeExpired=whatever'))).toThrow()
  })
  test('returns a filter with the correct includeExpired prop', () => {
    expect(parseOfferFiltersQuery(getRequest('includeExpired=true'))).toStrictEqual<OfferQueryFilters>({
      includeExpired: true
    })
    expect(parseOfferFiltersQuery(getRequest('includeExpired=false'))).toStrictEqual<OfferQueryFilters>({
      includeExpired: false
    })
  })
})

describe('helpers - request - parseOfferFiltersQuery - multiple filters', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if there are both state and notState filters', () => {
    expect(() =>
      parseOfferFiltersQuery(getRequest('as=receiver&state=OPEN&state=ACCEPTED&notState=CANCELLED&includeExpired=true'))
    ).toThrow()
  })
  test('returns the correct filters', () => {
    expect(
      parseOfferFiltersQuery(getRequest(`as=${OFFER_FILTER_AS_RECEIVER}&state=OPEN&state=ACCEPTED&includeExpired=true`))
    ).toStrictEqual<OfferQueryFilters>({
      as: OFFER_FILTER_AS_RECEIVER,
      state: ['OPEN', 'ACCEPTED'],
      includeExpired: true
    })
  })
})
