import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import { updateOffer } from '@echo/firestore/crud/offer/update-offer'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { getAllOfferMocks } from '@echo/firestore-mocks/offer/get-all-offer-mocks'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { either, filter, find, forEach, pathEq, propEq } from 'ramda'

describe('CRUD - offer - getOffersForUser', () => {
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'
  let initialExpiresAt: number

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  beforeEach(async () => {
    const offer = await findOfferById(id)
    initialExpiresAt = offer!.expiresAt
  })
  afterEach(async () => {
    await updateOffer(id, { expiresAt: initialExpiresAt })
  })

  it('returns the offers for the user (as a receiver or a sender)', async () => {
    const username = 'johnnycagewins'
    const userOfferMocks = filter(
      either(pathEq(username, ['sender', 'username']), pathEq(username, ['receiver', 'username'])),
      getAllOfferMocks()
    )
    const offers = await getOffersForUser(username, { includeExpired: true })
    expect(offers.length).toBe(userOfferMocks.length)
    forEach((offer: FirestoreOffer) => {
      const offerMock = find(propEq(offer.id, 'id'), userOfferMocks)
      expect(offer).toStrictEqual(offerMock)
    }, offers)
  })
})
