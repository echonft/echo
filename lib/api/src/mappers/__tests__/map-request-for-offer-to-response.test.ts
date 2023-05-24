/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RequestForOfferResponse } from '../../types'
import { mapRequestForOfferToResponse } from '../map-request-for-offer-to-response'
import { discordGuilds, RequestForOffer, RequestForOfferState, requestsForOffer } from '@echo/model'
import { describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

function callAndCatchMapper(requestForOffer: RequestForOffer) {
  try {
    mapRequestForOfferToResponse(requestForOffer)
    expect(false).toBeTruthy()
  } catch (e) {
    expect(e).toBeDefined()
  }
}
describe('mappers - mapRequestForOfferToResponse', () => {
  const mockRequestForOffer = requestsForOffer['jUzMtPGKM62mMhEcmbN4']!
  // FIXME
  const expectedResult: RequestForOfferResponse = {
    id: 'jUzMtPGKM62mMhEcmbN4',
    state: RequestForOfferState.EXPIRED,
    sender: mockRequestForOffer.sender,
    items: mockRequestForOffer.items,
    discordGuild: discordGuilds['xA40abnyBq6qQHSYmtHj']!,
    target: mockRequestForOffer.target,
    activities: [
      {
        date: 1676984897,
        toState: RequestForOfferState.CREATED,
        fromState: undefined
      },
      {
        date: 1676900000,
        toState: RequestForOfferState.EXPIRED,
        fromState: RequestForOfferState.CREATED
      }
    ],
    offers: [],
    swaps: [],
    expiresAt: 1676984897,
    postedAt: undefined,
    createdAt: 1676984897
  }
  it('valid data passes', () => {
    expect(mapRequestForOfferToResponse(mockRequestForOffer)).toStrictEqual(expectedResult)
  })
  it('invalid data passes', () => {
    // @ts-ignore
    let requestForOffer: RequestForOffer = omit(['id'], mockRequestForOffer)
    expect(mapRequestForOfferToResponse(requestForOffer)).toStrictEqual(omit(['id'], expectedResult))
    // @ts-ignore
    requestForOffer = omit(['discordGuild'], mockRequestForOffer)
    expect(mapRequestForOfferToResponse(requestForOffer)).toStrictEqual(omit(['discordGuild'], expectedResult))
  })
  it('invalid data throws', () => {
    // @ts-ignore
    let requestForOffer: RequestForOffer = omit(['items'], mockRequestForOffer)
    callAndCatchMapper(requestForOffer)
    // @ts-ignore
    requestForOffer = omit(['expiresAt'], mockRequestForOffer)
    callAndCatchMapper(requestForOffer)
    // @ts-ignore
    requestForOffer = omit(['createdAt'], mockRequestForOffer)
    callAndCatchMapper(requestForOffer)
  })
})
