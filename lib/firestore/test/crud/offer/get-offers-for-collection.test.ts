import { OFFER_FILTER_AS_RECEIVER, OFFER_FILTER_AS_SENDER } from '@echo/firestore/constants/offer/offer-filter-as'
import { getOffersForCollection } from '@echo/firestore/crud/offer/get-offers-for-collection'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assoc } from 'ramda'

describe('CRUD - offer - getOffersForCollection', () => {
  const collectionId = 'Rc8pLQXxgyQGIRL0fr13'
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
  const offerId2 = 'ASkFpKoHEHVH0gd69t1G'
  const mock = getOfferMockById(offerId)
  const mock2 = getOfferMockById(offerId2)

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns an empty array if no offers are found', async () => {
    const listings = await getOffersForCollection('not-found')
    expect(listings).toEqual([])
  })

  it('returns the offers for the which the collection is included in the receiver or sender items', async () => {
    const listings = await getOffersForCollection(collectionId)
    expect(listings.length).toBe(2)
    expect(listings[0]).toStrictEqual(mock2)
    expect(listings[1]).toStrictEqual(mock)
  })

  it('filter by state (included)', async () => {
    let listings = await getOffersForCollection(collectionId, { state: [OFFER_STATE_OPEN, OFFER_STATE_CANCELLED] })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getOffersForCollection(collectionId, { state: [OFFER_STATE_CANCELLED] })
    expect(listings.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    let listings = await getOffersForCollection(collectionId, {
      notState: [OFFER_STATE_REJECTED, OFFER_STATE_CANCELLED]
    })
    expect(listings.length).toBe(2)
    expect(listings[0]).toStrictEqual(mock2)
    expect(listings[1]).toStrictEqual(mock)
    listings = await getOffersForCollection(collectionId, { notState: [OFFER_STATE_OPEN, OFFER_STATE_COMPLETED] })
    expect(listings.length).toBe(0)
  })

  describe('CRUD - offer - getOffersForCollection - as receiver', () => {
    const collectionId = '1aomCtnoesD7WVll6Yi1'
    const filters: OfferQueryFilters = { as: OFFER_FILTER_AS_RECEIVER }

    it('returns an empty array if no offers are found', async () => {
      const listings = await getOffersForCollection('not-found', filters)
      expect(listings).toEqual([])
    })

    it('returns the offers for the which the collection is included in the receiver items', async () => {
      const listings = await getOffersForCollection(collectionId, filters)
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
    })

    it('filter by state (included)', async () => {
      let listings = await getOffersForCollection(
        collectionId,
        assoc('state', [OFFER_STATE_OPEN, OFFER_STATE_CANCELLED], filters)
      )
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
      listings = await getOffersForCollection(collectionId, assoc('state', [OFFER_STATE_CANCELLED], filters))
      expect(listings.length).toBe(0)
    })

    it('filter by state (excluded)', async () => {
      let listings = await getOffersForCollection(
        collectionId,
        assoc('notState', [OFFER_STATE_REJECTED, OFFER_STATE_CANCELLED], filters)
      )
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
      listings = await getOffersForCollection(
        collectionId,
        assoc('notState', [OFFER_STATE_OPEN, OFFER_STATE_ACCEPTED], filters)
      )
      expect(listings.length).toBe(0)
    })
  })

  describe('CRUD - offer - getOffersForCollection - as sender', () => {
    const collectionId = 'Rc8pLQXxgyQGIRL0fr13'
    const filters: OfferQueryFilters = { as: OFFER_FILTER_AS_SENDER }

    it('returns an empty array if no offers are found', async () => {
      const listings = await getOffersForCollection('not-found', filters)
      expect(listings).toEqual([])
    })

    it('returns the offers for the which the collection is included in the sender items', async () => {
      const listings = await getOffersForCollection(collectionId, filters)
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
    })

    it('filter by state (included)', async () => {
      let listings = await getOffersForCollection(
        collectionId,
        assoc('state', [OFFER_STATE_OPEN, OFFER_STATE_CANCELLED], filters)
      )
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
      listings = await getOffersForCollection(collectionId, assoc('state', [OFFER_STATE_CANCELLED], filters))
      expect(listings.length).toBe(0)
    })

    it('filter by state (excluded)', async () => {
      let listings = await getOffersForCollection(
        collectionId,
        assoc('notState', [OFFER_STATE_REJECTED, OFFER_STATE_CANCELLED], filters)
      )
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
      listings = await getOffersForCollection(
        collectionId,
        assoc('notState', [OFFER_STATE_OPEN, OFFER_STATE_ACCEPTED], filters)
      )
      expect(listings.length).toBe(0)
    })
  })
})
