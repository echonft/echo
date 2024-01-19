import type { ApiRequest } from '@echo/api/types/api-request'
import { OFFER_FILTER_AS_RECEIVER } from '@echo/firestore/constants/offer/offer-filter-as'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { parseOfferFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse-offer-filters-query'
import { OFFER_STATE_ACCEPTED, OFFER_STATE_CANCELLED, OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
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
    expect(() => parseOfferFiltersQuery(getRequest(`state=${OFFER_STATE_CANCELLED}&state=notvalid`))).toThrow()
  })
  test('returns a filter with the correct state prop', () => {
    expect(parseOfferFiltersQuery(getRequest(`state=${OFFER_STATE_CANCELLED}`))).toStrictEqual<OfferQueryFilters>({
      state: [OFFER_STATE_CANCELLED]
    })
    expect(
      parseOfferFiltersQuery(getRequest(`state=${OFFER_STATE_CANCELLED}&state=${OFFER_STATE_ACCEPTED}`))
    ).toStrictEqual<OfferQueryFilters>({
      state: [OFFER_STATE_CANCELLED, OFFER_STATE_ACCEPTED]
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
    expect(() => parseOfferFiltersQuery(getRequest(`notState=${OFFER_STATE_CANCELLED}&state=notvalid`))).toThrow()
  })
  test('returns a filter with the correct notState prop', () => {
    expect(parseOfferFiltersQuery(getRequest(`notState=${OFFER_STATE_CANCELLED}`))).toStrictEqual<OfferQueryFilters>({
      notState: [OFFER_STATE_CANCELLED]
    })
    expect(
      parseOfferFiltersQuery(getRequest(`notState=${OFFER_STATE_CANCELLED}&notState=${OFFER_STATE_ACCEPTED}`))
    ).toStrictEqual<OfferQueryFilters>({
      notState: [OFFER_STATE_CANCELLED, OFFER_STATE_ACCEPTED]
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
      parseOfferFiltersQuery(
        getRequest(
          `as=receiver&state=${OFFER_STATE_OPEN}&state=${OFFER_STATE_ACCEPTED}&notState=${OFFER_STATE_CANCELLED}`
        )
      )
    ).toThrow()
  })
  test('returns the correct filters', () => {
    expect(
      parseOfferFiltersQuery(
        getRequest(`as=${OFFER_FILTER_AS_RECEIVER}&state=${OFFER_STATE_OPEN}&state=${OFFER_STATE_ACCEPTED}`)
      )
    ).toStrictEqual<OfferQueryFilters>({
      as: OFFER_FILTER_AS_RECEIVER,
      state: [OFFER_STATE_OPEN, OFFER_STATE_ACCEPTED]
    })
  })
})
