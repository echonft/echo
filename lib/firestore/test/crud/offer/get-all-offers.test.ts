import { getAllOffers } from '../../../src/crud/offer/get-all-offers'
import { getAllOfferMocks } from '../../mocks/get-all-offer-mocks'
import { getOfferMockById } from '../../mocks/get-offer-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { Offer } from '@echo/firestore-types'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('CRUD - offer - getAllOffers', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('get all offers', async () => {
    const offerMocks = getAllOfferMocks()
    const offers = await getAllOffers()
    expect(offers.length).toEqual(offerMocks.length)
    forEach((offer: Offer) => {
      expect(getOfferMockById(offer.id)).toStrictEqual(offer)
    }, offers)
  })
})
