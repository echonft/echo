import { assertListings } from '@echo/firestore/utils/listing/assert-listings'
import { unchecked_updateListing } from '@echo/firestore/utils/listing/unchecked_update-listing'
import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { listingMockId, listingMockSlug } from '@echo/model/mocks/listing/listing-mock'
import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_EXPIRED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_OPEN
} from '@echo/model/constants/listing-states'
import { type ListingState } from '@echo/model/types/listing-state'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('CRUD - listing - cancelListing', () => {
  let initialState: ListingState
  let initialExpiresAt: number
  let initialUpdatedAt: number
  const listingId = listingMockId()
  const listingSlug = listingMockSlug()

  beforeAll(async () => {
    await assertListings()
  })
  afterAll(async () => {
    await assertListings()
  })
  beforeEach(async () => {
    const listing = (await getListingById(listingId))!
    initialState = listing.state
    initialExpiresAt = listing.expiresAt
    initialUpdatedAt = listing.updatedAt
  })
  afterEach(async () => {
    await unchecked_updateListing(listingId, {
      state: initialState,
      expiresAt: initialExpiresAt,
      updatedAt: initialUpdatedAt
    })
  })

  it('throws if the listing is undefined', async () => {
    await expect(cancelListing('not-found')).rejects.toBeDefined()
  })
  it('throws if the listing is expired', async () => {
    await unchecked_updateListing(listingId, {
      state: LISTING_STATE_EXPIRED,
      expiresAt: dayjs().subtract(1, 'day').unix()
    })
    await expect(cancelListing(listingId)).rejects.toBeDefined()
  })
  it('throws if the listing is cancelled', async () => {
    await unchecked_updateListing(listingId, {
      state: LISTING_STATE_CANCELLED,
      expiresAt: dayjs().add(1, 'day').unix()
    })
    await expect(cancelListing(listingId)).rejects.toBeDefined()
  })
  it('throws if the listing is fulfilled', async () => {
    await unchecked_updateListing(listingId, {
      state: LISTING_STATE_FULFILLED,
      expiresAt: dayjs().add(1, 'day').unix()
    })
    await expect(cancelListing(listingId)).rejects.toBeDefined()
  })
  it('cancel listing if its not expired and in the right state', async () => {
    await unchecked_updateListing(listingId, {
      state: LISTING_STATE_OPEN,
      expiresAt: dayjs().add(1, 'day').unix()
    })
    await cancelListing(listingSlug)
    const updatedListing = (await getListingById(listingId))!
    expect(updatedListing.state).toEqual(LISTING_STATE_CANCELLED)
    expect(dayjs.unix(updatedListing.updatedAt).isAfter(dayjs().subtract(1, 'minute'))).toBeTruthy()
    expect(dayjs.unix(updatedListing.updatedAt).isBefore(dayjs().add(1, 'minute'))).toBeTruthy()
  })
})
