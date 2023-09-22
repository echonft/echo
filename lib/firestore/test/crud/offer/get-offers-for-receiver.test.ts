import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { getOffersForReceiver } from '@echo/firestore/crud/offer/get-offers-for-receiver'
import { updateOffer } from '@echo/firestore/crud/offer/update-offer'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { getOfferMockById } from '@echo/firestore-mocks/offer/get-offer-mock-by-id'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

describe('CRUD - offer - getOffersForReceiver', () => {
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'
  let initialExpiresAt: dayjs.Dayjs

  async function setExpired(offer: FirestoreOffer) {
    const expiresAt = dayjs().subtract(1, 'day').set('ms', 0)
    await updateOffer(offer.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', true))(offer)
  }

  async function setNotExpired(offer: FirestoreOffer) {
    const expiresAt = dayjs().add(1, 'day').set('ms', 0)
    await updateOffer(offer.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', false))(offer)
  }

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

  it('returns an empty array if no offers are found', async () => {
    const offers = await getOffersForReceiver('not-found')
    expect(offers).toEqual([])
  })

  it('returns the offers for the receiver', async () => {
    const mock = await setNotExpired(getOfferMockById(id))
    const offers = await getOffersForReceiver('johnnycagewins')
    expect(offers.length).toBe(1)
    expect(offers[0]).toStrictEqual(mock)
  })

  it('filter by state (included)', async () => {
    const mock = await setNotExpired(getOfferMockById(id))
    let offers = await getOffersForReceiver('johnnycagewins', { states: ['OPEN', 'CANCELLED'] })
    expect(offers.length).toBe(1)
    expect(offers[0]).toStrictEqual(mock)
    offers = await getOffersForReceiver('johnnycagewins', { states: ['CANCELLED'] })
    expect(offers.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    const mock = await setNotExpired(getOfferMockById(id))
    let offers = await getOffersForReceiver('johnnycagewins', { notStates: ['INVALID', 'CANCELLED'] })
    expect(offers.length).toBe(1)
    expect(offers[0]).toStrictEqual(mock)
    offers = await getOffersForReceiver('johnnycagewins', { notStates: ['OPEN', 'FULFILLED'] })
    expect(offers.length).toBe(0)
  })

  it('includeExpired filter', async () => {
    const mock = await setExpired(getOfferMockById(id))
    let offers = await getOffersForReceiver('johnnycagewins', { includeExpired: true })
    expect(offers.length).toBe(1)
    expect(offers[0]).toStrictEqual(mock)
    offers = await getOffersForReceiver('johnnycagewins', { includeExpired: false })
    expect(offers.length).toBe(0)
    offers = await getOffersForReceiver('johnnycagewins')
    expect(offers.length).toBe(0)
  })
})
