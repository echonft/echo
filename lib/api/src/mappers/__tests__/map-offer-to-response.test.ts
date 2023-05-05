/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OfferResponse } from '../../types/model/responses/offer-response'
import { mapOfferToResponse } from '../map-offer-to-response'
import { offers } from '@echo/firebase-admin'
import { Offer } from '@echo/model'
import { describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

function callAndCatchMapper(offer: Offer) {
  try {
    mapOfferToResponse(offer)
    expect(false).toBeTruthy()
  } catch (e) {
    expect(e).toBeDefined()
  }
}

describe('mappers - mapOfferToResponse', () => {
  const mockOffer = offers['LyCfl6Eg7JKuD7XJ6IPi']!
  const expectedResult: OfferResponse = {
    ...mockOffer,
    activities: mockOffer.activities?.map((activity) => ({ ...activity, date: activity.date.unix() })),
    senderItems: mockOffer.senderItems.map((item) => ({ ...item, tokenId: item.tokenId.toString() })),
    receiverItems: mockOffer.receiverItems.map((item) => ({ ...item, tokenId: item.tokenId.toString() })),
    postedAt: undefined,
    expiresAt: 1676984897,
    createdAt: 1676984897
  }
  it('valid data passes', () => {
    expect(mapOfferToResponse(mockOffer)).toStrictEqual(expectedResult)
    const offer = { ...mockOffer, postedAt: mockOffer.createdAt }
    const result = { ...expectedResult, postedAt: 1676984897 }
    expect(mapOfferToResponse(offer)).toStrictEqual(result)
  })
  it('invalid data passes', () => {
    // @ts-ignore
    let offer: Offer = omit(['id'], mockOffer)
    expect(mapOfferToResponse(offer)).toStrictEqual(omit(['id'], expectedResult))
    // @ts-ignore
    offer = omit(['state'], mockOffer)
    expect(mapOfferToResponse(offer)).toStrictEqual(omit(['state'], expectedResult))
    // @ts-ignore
    offer = omit(['discordGuild'], mockOffer)
    expect(mapOfferToResponse(offer)).toStrictEqual(omit(['discordGuild'], expectedResult))
  })
  it('invalid data throws', () => {
    // @ts-ignore
    let offer: Offer = omit(['expiresAt'], mockOffer)
    callAndCatchMapper(offer)
    // @ts-ignore
    offer = omit(['createdAt'], mockOffer)
    callAndCatchMapper(offer)
    // @ts-ignore
    offer = omit(['senderItems'], mockOffer)
    callAndCatchMapper(offer)
    // @ts-ignore
    offer = omit(['receiverItems'], mockOffer)
    callAndCatchMapper(offer)
  })
})
