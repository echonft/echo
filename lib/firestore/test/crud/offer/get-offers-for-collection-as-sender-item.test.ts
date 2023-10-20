import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { getOffersForCollectionAsSenderItem } from '@echo/firestore/crud/offer/get-offers-for-collection-as-sender-item'
import { type Offer } from '@echo/model/types/offer'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { uncheckedUpdateOffer } from '@test-utils/offer/unchecked-update-offer'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

describe('CRUD - offer - getOffersForCollectionAsSenderItem', () => {
  const collectionId = 'Rc8pLQXxgyQGIRL0fr13'
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'
  let initialExpiresAt: number

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
    const offer = (await findOfferById(id))!
    initialExpiresAt = offer.expiresAt
  })
  afterEach(async () => {
    await uncheckedUpdateOffer(id, { expiresAt: initialExpiresAt })
  })

  it('returns an empty array if no offers are found', async () => {
    const listings = await getOffersForCollectionAsSenderItem('not-found')
    expect(listings).toEqual([])
  })

  it('returns the offers for the which the collection is included in the sender items', async () => {
    const mock = await setNotExpired(getOfferMockById(id))
    const listings = await getOffersForCollectionAsSenderItem(collectionId)
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
  })

  it('filter by state (included)', async () => {
    const mock = await setNotExpired(getOfferMockById(id))
    let listings = await getOffersForCollectionAsSenderItem(collectionId, { states: ['OPEN', 'CANCELLED'] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getOffersForCollectionAsSenderItem(collectionId, { states: ['CANCELLED'] })
    expect(listings.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    const mock = await setNotExpired(getOfferMockById(id))
    let listings = await getOffersForCollectionAsSenderItem(collectionId, { notStates: ['REJECTED', 'CANCELLED'] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getOffersForCollectionAsSenderItem(collectionId, { notStates: ['OPEN', 'ACCEPTED'] })
    expect(listings.length).toBe(0)
  })

  it('includeExpired filter', async () => {
    const mock = await setExpired(getOfferMockById(id))
    let listings = await getOffersForCollectionAsSenderItem(collectionId, { includeExpired: true })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getOffersForCollectionAsSenderItem(collectionId, { includeExpired: false })
    expect(listings.length).toBe(0)
    listings = await getOffersForCollectionAsSenderItem(collectionId)
    expect(listings.length).toBe(0)
  })
})
