import { findOfferById } from '../../../src/crud/offer/find-offer-by-id'
import { getOffersForUser } from '../../../src/crud/offer/get-offers-for-user'
import { updateOffer } from '../../../src/crud/offer/update-offer'
import { getOfferMockById } from '../../mocks/get-offer-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { Offer } from '@echo/firestore-types'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

describe('CRUD - offer - getOffersForUser', () => {
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'
  let initialExpiresAt: dayjs.Dayjs

  async function setNotExpired(offer: Offer) {
    const expiresAt = dayjs().add(1, 'day').set('ms', 0)
    await updateOffer(offer.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', false))(offer)
  }

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
    const mock = await setNotExpired(getOfferMockById(id))
    let offers = await getOffersForUser('oE6yUEQBPn7PZ89yMjKn')
    expect(offers.length).toBe(1)
    expect(offers[0]).toStrictEqual(mock)
    offers = await getOffersForUser('6rECUMhevHfxABZ1VNOm')
    expect(offers.length).toBe(1)
    expect(offers[0]).toStrictEqual(mock)
  })
})
