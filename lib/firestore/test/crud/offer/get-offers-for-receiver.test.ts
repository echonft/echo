import { findOfferById } from '../../../src/crud/offer/find-offer-by-id'
import { getOffersForReceiver } from '../../../src/crud/offer/get-offers-for-receiver'
import { updateOffer } from '../../../src/crud/offer/update-offer'
import { getOfferMockById } from '../../mocks/get-offer-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { Offer } from '@echo/firestore-types'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

describe('CRUD - offer - getOffersForReceiver', () => {
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'
  let initialExpiresAt: dayjs.Dayjs

  async function setExpired(offer: Offer) {
    const expiresAt = dayjs().subtract(1, 'day').set('ms', 0)
    await updateOffer(offer.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', true))(offer)
  }

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

  it('returns an empty array if no offers are found', async () => {
    const offers = await getOffersForReceiver('6rECUMhevHfxABZ1VNOm')
    expect(offers).toEqual([])
  })

  it('returns the offers for the receiver', async () => {
    const mock = await setNotExpired(getOfferMockById(id))
    const offers = await getOffersForReceiver('oE6yUEQBPn7PZ89yMjKn')
    expect(offers.length).toBe(1)
    expect(offers[0]).toStrictEqual(mock)
  })

  it('filter by state (included)', async () => {
    const mock = await setNotExpired(getOfferMockById(id))
    let offers = await getOffersForReceiver('oE6yUEQBPn7PZ89yMjKn', { states: ['OPEN', 'CANCELLED'] })
    expect(offers.length).toBe(1)
    expect(offers[0]).toStrictEqual(mock)
    offers = await getOffersForReceiver('oE6yUEQBPn7PZ89yMjKn', { states: ['CANCELLED'] })
    expect(offers.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    const mock = await setNotExpired(getOfferMockById(id))
    let offers = await getOffersForReceiver('oE6yUEQBPn7PZ89yMjKn', { notStates: ['INVALID', 'CANCELLED'] })
    expect(offers.length).toBe(1)
    expect(offers[0]).toStrictEqual(mock)
    offers = await getOffersForReceiver('oE6yUEQBPn7PZ89yMjKn', { notStates: ['OPEN', 'FULFILLED'] })
    expect(offers.length).toBe(0)
  })

  it('filter by state (both included and excluded)', async () => {
    9
    const mock = await setNotExpired(getOfferMockById(id))
    const offers = await getOffersForReceiver('oE6yUEQBPn7PZ89yMjKn', {
      states: ['OPEN'],
      notStates: ['INVALID', 'CANCELLED']
    })
    expect(offers.length).toBe(1)
    expect(offers[0]).toStrictEqual(mock)
  })

  it('includeExpirer filter', async () => {
    const mock = await setExpired(getOfferMockById(id))
    let offers = await getOffersForReceiver('oE6yUEQBPn7PZ89yMjKn', { includeExpired: true })
    expect(offers.length).toBe(1)
    expect(offers[0]).toStrictEqual(mock)
    offers = await getOffersForReceiver('oE6yUEQBPn7PZ89yMjKn', { includeExpired: false })
    expect(offers.length).toBe(0)
    offers = await getOffersForReceiver('oE6yUEQBPn7PZ89yMjKn')
    expect(offers.length).toBe(0)
  })
})
