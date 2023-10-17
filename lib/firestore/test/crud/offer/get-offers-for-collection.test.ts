import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { getOffersForCollection } from '@echo/firestore/crud/offer/get-offers-for-collection'
import { getOfferMockById } from '@echo/firestore-mocks/offer/get-offer-mock-by-id'
import type { Offer } from '@echo/model/types/offer'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { uncheckedUpdateOffer } from '@test-utils/offer/unchecked-update-offer'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

describe('CRUD - offer - getOffersForCollection', () => {
  const collectionId = 'Rc8pLQXxgyQGIRL0fr13'
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
  const offerId2 = 'ASkFpKoHEHVH0gd69t1G'
  let initialExpiresAt: number
  let initialExpiresAt2: number

  async function setExpired(offer: Offer) {
    const expiresAt = dayjs().subtract(1, 'day').set('ms', 0).unix()
    await uncheckedUpdateOffer(offer.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', true))(offer)
  }

  async function setNotExpired(offer: Offer) {
    const expiresAt = dayjs().add(1, 'day').set('ms', 0).unix()
    await uncheckedUpdateOffer(offer.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', false))(offer)
  }

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  beforeEach(async () => {
    const offer = (await findOfferById(offerId))!
    initialExpiresAt = offer.expiresAt
    const offer2 = (await findOfferById(offerId2))!
    initialExpiresAt2 = offer2.expiresAt
  })
  afterEach(async () => {
    await uncheckedUpdateOffer(offerId, { expiresAt: initialExpiresAt })
    await uncheckedUpdateOffer(offerId2, { expiresAt: initialExpiresAt2 })
  })

  it('returns an empty array if no offers are found', async () => {
    const listings = await getOffersForCollection('not-found')
    expect(listings).toEqual([])
  })

  it('returns the offers for the which the collection is included in the receiver or sender items', async () => {
    const mock = await setNotExpired(getOfferMockById(offerId))
    const mock2 = await setNotExpired(getOfferMockById(offerId2))
    const listings = await getOffersForCollection(collectionId)
    expect(listings.length).toBe(2)
    expect(listings[0]).toStrictEqual(mock2)
    expect(listings[1]).toStrictEqual(mock)
  })

  it('filter by state (included)', async () => {
    const mock = await setNotExpired(getOfferMockById(offerId))
    let listings = await getOffersForCollection(collectionId, { states: ['OPEN', 'CANCELLED'] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getOffersForCollection(collectionId, { states: ['CANCELLED'] })
    expect(listings.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    const mock = await setNotExpired(getOfferMockById(offerId))
    const mock2 = await setNotExpired(getOfferMockById(offerId2))
    let listings = await getOffersForCollection(collectionId, { notStates: ['REJECTED', 'CANCELLED'] })
    expect(listings.length).toBe(2)
    expect(listings[0]).toStrictEqual(mock2)
    expect(listings[1]).toStrictEqual(mock)
    listings = await getOffersForCollection(collectionId, { notStates: ['OPEN', 'COMPLETED'] })
    expect(listings.length).toBe(0)
  })

  it('includeExpired filter', async () => {
    const mock = await setExpired(getOfferMockById(offerId))
    const mock2 = await setExpired(getOfferMockById(offerId2))
    let listings = await getOffersForCollection(collectionId, { includeExpired: true })
    expect(listings.length).toBe(2)
    expect(listings[0]).toStrictEqual(mock2)
    expect(listings[1]).toStrictEqual(mock)
    listings = await getOffersForCollection(collectionId, { includeExpired: false })
    expect(listings.length).toBe(0)
    listings = await getOffersForCollection(collectionId)
    expect(listings.length).toBe(0)
  })
})
