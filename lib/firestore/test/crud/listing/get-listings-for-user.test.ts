import { LISTING_FILTER_AS_ITEM } from '@echo/firestore/constants/listing/listing-filter-as'
import { getListingsForUser } from '@echo/firestore/crud/listing/get-listings-for-user'
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

describe('CRUD - listing - getListingsForUser - as creator', () => {
  const id = 'jUzMtPGKM62mMhEcmbN4'
  const username = 'johnnycagewins'
  const mock = getListingMockById(id)
  const filters: ListingQueryFilters = { as: LISTING_FILTER_AS_ITEM }

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns an empty array if no listings are found', async () => {
    const listings = await getListingsForUser('not-found', filters)
    expect(listings).toEqual([])
  })

  it('returns the listings for the creator', async () => {
    const listings = await getListingsForUser(username, filters)
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
  })

  it('filter by state (included)', async () => {
    let listings = await getListingsForUser(
      username,
      assoc('state', [LISTING_STATE_OFFERS_PENDING, LISTING_STATE_CANCELLED], filters)
    )
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForUser(username, assoc('state', [LISTING_STATE_CANCELLED], filters))
    expect(listings.length).toBe(0)
  })

  it('filter by state (excluded)', async () => {
    let listings = await getListingsForUser(
      username,
      assoc('notState', [LISTING_STATE_PARTIALLY_FULFILLED, LISTING_STATE_CANCELLED], filters)
    )
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(mock)
    listings = await getListingsForUser(
      username,
      assoc('notState', [LISTING_STATE_OFFERS_PENDING, LISTING_STATE_FULFILLED], filters)
    )
    expect(listings.length).toBe(0)
  })
})
