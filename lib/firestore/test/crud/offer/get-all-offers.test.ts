import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'
import { getAllOfferMocks } from '@echo/firestore-mocks/get-all-offer-mocks'
import { getOfferMockById } from '@echo/firestore-mocks/get-offer-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { forEach } from 'ramda'

describe('CRUD - offer - getAllOffers', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('get all offers', async () => {
    const offerMocks = getAllOfferMocks()
    const offers = await getAllOffers()
    expect(offers.length).toEqual(offerMocks.length)
    forEach((offer: FirestoreOffer) => {
      expect(getOfferMockById(offer.id)).toStrictEqual(offer)
    }, offers)
  })
})
