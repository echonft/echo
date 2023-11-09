import { OFFER_FILTER_AS_RECEIVER, OFFER_FILTER_AS_SENDER } from '@echo/firestore/constants/offer/offer-filter-as'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { getOffersForCollection } from '@echo/firestore/crud/offer/get-offers-for-collection'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { unchecked_updateOffer } from '@echo/firestore-test/offer/unchecked_update-offer'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { type Offer } from '@echo/model/types/offer'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
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
    await unchecked_updateOffer(offer.id, { expiresAt })
    return pipe(assoc('expiresAt', expiresAt), assoc('expired', true))(offer)
  }

  async function setNotExpired(offer: Offer) {
    const expiresAt = dayjs().add(1, 'day').set('ms', 0).unix()
    await unchecked_updateOffer(offer.id, { expiresAt })
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
    await unchecked_updateOffer(offerId, { expiresAt: initialExpiresAt })
    await unchecked_updateOffer(offerId2, { expiresAt: initialExpiresAt2 })
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
    let listings = await getOffersForCollection(collectionId, { state: ['OPEN', 'CANCELLED'] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getOffersForCollection(collectionId, { state: ['CANCELLED'] })
    expect(listings.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    const mock = await setNotExpired(getOfferMockById(offerId))
    const mock2 = await setNotExpired(getOfferMockById(offerId2))
    let listings = await getOffersForCollection(collectionId, { notState: ['REJECTED', 'CANCELLED'] })
    expect(listings.length).toBe(2)
    expect(listings[0]).toStrictEqual(mock2)
    expect(listings[1]).toStrictEqual(mock)
    listings = await getOffersForCollection(collectionId, { notState: ['OPEN', 'COMPLETED'] })
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

  describe('CRUD - offer - getOffersForCollection - as receiver', () => {
    const collectionId = '1aomCtnoesD7WVll6Yi1'
    const id = 'LyCfl6Eg7JKuD7XJ6IPi'
    const filters: OfferQueryFilters = { as: OFFER_FILTER_AS_RECEIVER }
    let initialExpiresAt: number

    beforeEach(async () => {
      const offer = (await findOfferById(id))!
      initialExpiresAt = offer.expiresAt
    })
    afterEach(async () => {
      await unchecked_updateOffer(id, { expiresAt: initialExpiresAt })
    })

    it('returns an empty array if no offers are found', async () => {
      const listings = await getOffersForCollection('not-found', filters)
      expect(listings).toEqual([])
    })

    it('returns the offers for the which the collection is included in the receiver items', async () => {
      const mock = await setNotExpired(getOfferMockById(id))
      const listings = await getOffersForCollection(collectionId, filters)
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
    })

    it('filter by state (included)', async () => {
      const mock = await setNotExpired(getOfferMockById(id))
      let listings = await getOffersForCollection(collectionId, assoc('state', ['OPEN', 'CANCELLED'], filters))
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
      listings = await getOffersForCollection(collectionId, assoc('state', ['CANCELLED'], filters))
      expect(listings.length).toBe(0)
    })

    it('filter by state (excluded)', async () => {
      const mock = await setNotExpired(getOfferMockById(id))
      let listings = await getOffersForCollection(collectionId, assoc('notState', ['REJECTED', 'CANCELLED'], filters))
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
      listings = await getOffersForCollection(collectionId, assoc('notState', ['OPEN', 'ACCEPTED'], filters))
      expect(listings.length).toBe(0)
    })

    it('includeExpired filter', async () => {
      const mock = await setExpired(getOfferMockById(id))
      let listings = await getOffersForCollection(collectionId, assoc('includeExpired', true, filters))
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
      listings = await getOffersForCollection(collectionId, assoc('includeExpired', false, filters))
      expect(listings.length).toBe(0)
      listings = await getOffersForCollection(collectionId, filters)
      expect(listings.length).toBe(0)
    })
  })

  describe('CRUD - offer - getOffersForCollection - as sender', () => {
    const collectionId = 'Rc8pLQXxgyQGIRL0fr13'
    const id = 'LyCfl6Eg7JKuD7XJ6IPi'
    const filters: OfferQueryFilters = { as: OFFER_FILTER_AS_SENDER }
    let initialExpiresAt: number

    beforeEach(async () => {
      const offer = (await findOfferById(id))!
      initialExpiresAt = offer.expiresAt
    })
    afterEach(async () => {
      await unchecked_updateOffer(id, { expiresAt: initialExpiresAt })
    })

    it('returns an empty array if no offers are found', async () => {
      const listings = await getOffersForCollection('not-found', filters)
      expect(listings).toEqual([])
    })

    it('returns the offers for the which the collection is included in the sender items', async () => {
      const mock = await setNotExpired(getOfferMockById(id))
      const listings = await getOffersForCollection(collectionId, filters)
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
    })

    it('filter by state (included)', async () => {
      const mock = await setNotExpired(getOfferMockById(id))
      let listings = await getOffersForCollection(collectionId, assoc('state', ['OPEN', 'CANCELLED'], filters))
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
      listings = await getOffersForCollection(collectionId, assoc('state', ['CANCELLED'], filters))
      expect(listings.length).toBe(0)
    })

    it('filter by state (excluded)', async () => {
      const mock = await setNotExpired(getOfferMockById(id))
      let listings = await getOffersForCollection(collectionId, assoc('notState', ['REJECTED', 'CANCELLED'], filters))
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
      listings = await getOffersForCollection(collectionId, assoc('notState', ['OPEN', 'ACCEPTED'], filters))
      expect(listings.length).toBe(0)
    })

    it('includeExpired filter', async () => {
      const mock = await setExpired(getOfferMockById(id))
      let listings = await getOffersForCollection(collectionId, assoc('includeExpired', true, filters))
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
      listings = await getOffersForCollection(collectionId, assoc('includeExpired', false, filters))
      expect(listings.length).toBe(0)
      listings = await getOffersForCollection(collectionId, filters)
      expect(listings.length).toBe(0)
    })
  })
})
