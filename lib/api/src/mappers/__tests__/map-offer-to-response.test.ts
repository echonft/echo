/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OfferResponse } from '../../types/model/responses/offer-response'
import { mapOfferToResponse } from '../map-offer-to-response'
import { offerFirestoreData } from '@echo/firestore'
import { Offer, offers } from '@echo/model'
import { describe, expect, it } from '@jest/globals'
import { dissocPath, omit } from 'ramda'

describe('mappers - mapOfferToResponse', () => {
  const mockOffer = offers['LyCfl6Eg7JKuD7XJ6IPi']!
  const expectedResult: OfferResponse = dissocPath(['refPath'], offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!)
  it('valid data passes', () => {
    expect(mapOfferToResponse(mockOffer)).toEqual(expectedResult)
    const offer = { ...mockOffer, postedAt: mockOffer.createdAt }
    const result = { ...expectedResult, postedAt: 1676984897 }
    expect(mapOfferToResponse(offer)).toEqual(result)
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
})
