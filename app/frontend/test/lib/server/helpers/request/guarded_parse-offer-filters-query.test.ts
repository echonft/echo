import type { ApiRequest } from '@echo/api/types/api-request'
import { OfferFilterAsReceiver } from '@echo/firestore/constants/offer-filter-as'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { guarded_parseOfferFiltersQuery } from '@echo/frontend/lib/server/helpers/request/guarded_parse-offer-filters-query'
import { NextRequest } from 'next/server'

describe('helpers - request - guarded_parseOfferFiltersQuery - empty', () => {
  test('returns undefined if the URL does not have any filters', () => {
    const url = new URL('https://echo.xyz/')
    const request = new NextRequest(url) as ApiRequest<never>
    expect(guarded_parseOfferFiltersQuery(request)).toBeUndefined()
  })
})

describe('helpers - request - guarded_parseOfferFiltersQuery - as filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if as is not "receiver" or "sender"', () => {
    expect(() => guarded_parseOfferFiltersQuery(getRequest('as=whatever'))).toThrow()
  })
  test('returns a filter with the correct as prop', () => {
    expect(guarded_parseOfferFiltersQuery(getRequest(`as=${OfferFilterAsReceiver}`))).toStrictEqual<OfferQueryFilters>({
      as: OfferFilterAsReceiver
    })
  })
})

describe('helpers - request - guarded_parseOfferFiltersQuery - state filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if state is not valid', () => {
    expect(() => guarded_parseOfferFiltersQuery(getRequest('state=whatever'))).toThrow()
    expect(() => guarded_parseOfferFiltersQuery(getRequest('state=accepted'))).toThrow()
    expect(() => guarded_parseOfferFiltersQuery(getRequest('state=CANCELLED&state=notvalid'))).toThrow()
  })
  test('returns a filter with the correct state prop', () => {
    expect(guarded_parseOfferFiltersQuery(getRequest('state=CANCELLED'))).toStrictEqual<OfferQueryFilters>({
      state: ['CANCELLED']
    })
    expect(
      guarded_parseOfferFiltersQuery(getRequest('state=CANCELLED&state=ACCEPTED'))
    ).toStrictEqual<OfferQueryFilters>({
      state: ['CANCELLED', 'ACCEPTED']
    })
  })
})

describe('helpers - request - guarded_parseOfferFiltersQuery - notState filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if notState is not valid', () => {
    expect(() => guarded_parseOfferFiltersQuery(getRequest('notState=whatever'))).toThrow()
    expect(() => guarded_parseOfferFiltersQuery(getRequest('notState=accepted'))).toThrow()
    expect(() => guarded_parseOfferFiltersQuery(getRequest('notState=CANCELLED&state=notvalid'))).toThrow()
  })
  test('returns a filter with the correct notState prop', () => {
    expect(guarded_parseOfferFiltersQuery(getRequest('notState=CANCELLED'))).toStrictEqual<OfferQueryFilters>({
      notState: ['CANCELLED']
    })
    expect(
      guarded_parseOfferFiltersQuery(getRequest('notState=CANCELLED&notState=ACCEPTED'))
    ).toStrictEqual<OfferQueryFilters>({
      notState: ['CANCELLED', 'ACCEPTED']
    })
  })
})

describe('helpers - request - guarded_parseOfferFiltersQuery - includeExpired filter', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if includeExpired is not valid', () => {
    expect(() => guarded_parseOfferFiltersQuery(getRequest('includeExpired=whatever'))).toThrow()
  })
  test('returns a filter with the correct includeExpired prop', () => {
    expect(guarded_parseOfferFiltersQuery(getRequest('includeExpired=true'))).toStrictEqual<OfferQueryFilters>({
      includeExpired: true
    })
    expect(guarded_parseOfferFiltersQuery(getRequest('includeExpired=false'))).toStrictEqual<OfferQueryFilters>({
      includeExpired: false
    })
  })
})

describe('helpers - request - guarded_parseOfferFiltersQuery - multiple filters', () => {
  function getRequest(params: string) {
    const url = new URL(`https://echo.xyz/?${params}`)
    return new NextRequest(url) as ApiRequest<never>
  }
  test('throws if there are both state and notState filters', () => {
    expect(() =>
      guarded_parseOfferFiltersQuery(
        getRequest('as=receiver&state=OPEN&state=ACCEPTED&notState=CANCELLED&includeExpired=true')
      )
    ).toThrow()
  })
  test('returns the correct filters', () => {
    expect(
      guarded_parseOfferFiltersQuery(
        getRequest(`as=${OfferFilterAsReceiver}&state=OPEN&state=ACCEPTED&includeExpired=true`)
      )
    ).toStrictEqual<OfferQueryFilters>({
      as: OfferFilterAsReceiver,
      state: ['OPEN', 'ACCEPTED'],
      includeExpired: true
    })
  })
})
