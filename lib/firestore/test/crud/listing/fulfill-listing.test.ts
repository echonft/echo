import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { fulfillListing } from '@echo/firestore/crud/listing/fulfill-listing'
import type { FirestoreListingState } from '@echo/firestore/types/model/listing/firestore-listing-state'
import { expectDateNumberIsNow } from '@echo/test-utils/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertListings } from '@test-utils/listing/assert-listings'
import { updateListing } from '@test-utils/listing/update-listing'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'

describe('CRUD - listing - fulfillListing', () => {
  let initialState: FirestoreListingState
  let initialExpiresAt: number
  let initialUpdatedAt: number
  const listingId = 'jUzMtPGKM62mMhEcmbN4'

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertListings()
    await tearDownRemoteFirestoreTests()
  })

  beforeEach(async () => {
    const listing = (await findListingById(listingId))!
    initialState = listing.state
    initialExpiresAt = listing.expiresAt
    initialUpdatedAt = listing.updatedAt
  })
  afterEach(async () => {
    await updateListing(listingId, { state: initialState, expiresAt: initialExpiresAt, updatedAt: initialUpdatedAt })
  })

  it('throws if the listing is undefined', async () => {
    await expect(fulfillListing('not-found')).rejects.toBeDefined()
  })
  it('throws if the listing is expired', async () => {
    await updateListing(listingId, { state: 'OPEN', expiresAt: dayjs().subtract(1, 'day').unix() })
    await expect(fulfillListing(listingId)).rejects.toBeDefined()
  })
  it('throws if the listing is cancelled', async () => {
    await updateListing(listingId, { state: 'CANCELLED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(fulfillListing(listingId)).rejects.toBeDefined()
  })
  it('throws if the listing is fulfilled', async () => {
    await updateListing(listingId, { state: 'FULFILLED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(fulfillListing(listingId)).rejects.toBeDefined()
  })
  it('throws if the listing is invalid', async () => {
    await updateListing(listingId, { state: 'INVALID', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(fulfillListing(listingId)).rejects.toBeDefined()
  })

  it('fullfill listing if its not expired', async () => {
    await updateListing(listingId, { state: 'OPEN', expiresAt: dayjs().add(1, 'day').unix() })
    await fulfillListing(listingId)
    const updatedListing = (await findListingById(listingId))!
    expect(updatedListing.state).toEqual('FULFILLED')
    expectDateNumberIsNow(updatedListing.updatedAt)
  })
})
