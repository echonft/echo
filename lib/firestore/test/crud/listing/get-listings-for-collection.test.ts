import { LISTING_FILTER_AS_ITEM, LISTING_FILTER_AS_TARGET } from '@echo/firestore/constants/listing/listing-filter-as'
import { getListingsForCollection } from '@echo/firestore/crud/listing/get-listings-for-collection'
import type { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_OFFERS_PENDING,
  LISTING_STATE_PARTIALLY_FULFILLED
} from '@echo/model/constants/listing-states'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assoc } from 'ramda'

describe('CRUD - listing - getListingsForCollection', () => {
  const collectionSlug = 'spiral-frequencies'
  const id = 'jUzMtPGKM62mMhEcmbN4'
  const mock = getListingMockById(id)

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns an empty array if no listings are found', async () => {
    const listings = await getListingsForCollection('not-found')
    expect(listings).toEqual([])
  })

  it('returns the listings for the which the collection is included in the targets or items', async () => {
    const listings = await getListingsForCollection(collectionSlug)
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
  })

  it('filter by state (included)', async () => {
    let listings = await getListingsForCollection(collectionSlug, {
      state: [LISTING_STATE_OFFERS_PENDING, LISTING_STATE_CANCELLED]
    })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForCollection(collectionSlug, { state: [LISTING_STATE_CANCELLED] })
    expect(listings.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    let listings = await getListingsForCollection(collectionSlug, {
      notState: [LISTING_STATE_PARTIALLY_FULFILLED, LISTING_STATE_CANCELLED]
    })
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForCollection(collectionSlug, {
      notState: [LISTING_STATE_OFFERS_PENDING, LISTING_STATE_FULFILLED]
    })
    expect(listings.length).toBe(0)
  })

  describe('CRUD - listing - getListingsForCollection - as item', () => {
    const filters: ListingQueryFilters = { as: LISTING_FILTER_AS_ITEM }

    it('returns an empty array if no listings are found', async () => {
      const listings = await getListingsForCollection('pxmythics-genesis', filters)
      expect(listings).toEqual([])
    })

    it('returns the listings for the which the collection is included in the items', async () => {
      const listings = await getListingsForCollection(collectionSlug, filters)
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
    })

    it('filter by state (included)', async () => {
      let listings = await getListingsForCollection(
        collectionSlug,
        assoc('state', [LISTING_STATE_OFFERS_PENDING, LISTING_STATE_CANCELLED], filters)
      )
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
      listings = await getListingsForCollection(collectionSlug, assoc('state', [LISTING_STATE_CANCELLED], filters))
      expect(listings.length).toBe(0)
    })

    it('filter by state (excluded)', async () => {
      let listings = await getListingsForCollection(collectionSlug, {
        notState: [LISTING_STATE_PARTIALLY_FULFILLED, LISTING_STATE_CANCELLED]
      })
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
      listings = await getListingsForCollection(
        collectionSlug,
        assoc('notState', [LISTING_STATE_OFFERS_PENDING, LISTING_STATE_FULFILLED], filters)
      )
      expect(listings.length).toBe(0)
    })
  })

  describe('CRUD - listing - getListingsForCollection - as target', () => {
    const filters: ListingQueryFilters = { as: LISTING_FILTER_AS_TARGET }
    const collectionSlug = 'pxmythics-genesis'

    it('returns an empty array if no listings are found', async () => {
      const listings = await getListingsForCollection('spiral-frequencies', filters)
      expect(listings).toEqual([])
    })

    it('returns the listings for the which the collection is included in the targets', async () => {
      const listings = await getListingsForCollection(collectionSlug, filters)
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
    })

    it('filter by state (included)', async () => {
      let listings = await getListingsForCollection(
        collectionSlug,
        assoc('state', [LISTING_STATE_OFFERS_PENDING, LISTING_STATE_CANCELLED], filters)
      )
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
      listings = await getListingsForCollection(collectionSlug, assoc('state', [LISTING_STATE_CANCELLED], filters))
      expect(listings.length).toBe(0)
    })

    it('filter by state (excluded)', async () => {
      let listings = await getListingsForCollection(
        collectionSlug,
        assoc('notState', [LISTING_STATE_PARTIALLY_FULFILLED, LISTING_STATE_CANCELLED], filters)
      )
      expect(listings.length).toBe(1)
      expect(listings[0]).toStrictEqual(mock)
      listings = await getListingsForCollection(
        collectionSlug,
        assoc('notState', [LISTING_STATE_OFFERS_PENDING, LISTING_STATE_FULFILLED], filters)
      )
      expect(listings.length).toBe(0)
    })
  })
})
