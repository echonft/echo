import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import { updateOffer } from '@echo/firestore/crud/offer/update-offer'
import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'
import { getAllOfferMocks } from '@echo/firestore-mocks/get-all-offer-mocks'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { either, filter, find, forEach, pathEq, propEq } from 'ramda'

describe('CRUD - offer - getOffersForUser', () => {
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'
  let initialExpiresAt: dayjs.Dayjs

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  beforeEach(async () => {
    const offer = await findOfferById(id)
    initialExpiresAt = offer!.expiresAt
  })
  afterEach(async () => {
    await updateOffer(id, { expiresAt: initialExpiresAt })
  })

  it('returns the offers for the user (as a receiver or a sender)', async () => {
    const userId = 'oE6yUEQBPn7PZ89yMjKn'
    const userOfferMocks = filter(
      either(pathEq(userId, ['sender', 'id']), pathEq(userId, ['receiver', 'id'])),
      getAllOfferMocks()
    )
    const offers = await getOffersForUser(userId, { includeExpired: true })
    expect(offers.length).toBe(userOfferMocks.length)
    forEach((offer: Partial<FirestoreOffer>) => {
      const offerMock = find(propEq(offer.id, 'id'), userOfferMocks)
      expect(offer).toStrictEqual(offerMock)
    }, offers)
  })
})
