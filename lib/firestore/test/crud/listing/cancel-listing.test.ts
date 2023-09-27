import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { updateListing } from '@echo/firestore/crud/listing/update-listing'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { FirestoreListingState } from '@echo/firestore/types/model/listing/firestore-listing-state'
import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertListings } from '@test-utils/listing/assert-listings'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'

describe('CRUD - listing - cancelListing', () => {
  let initialState: FirestoreListingState
  let initialExpiresAt: dayjs.Dayjs
  let initialUpdatedAt: dayjs.Dayjs
  const listingId = 'jUzMtPGKM62mMhEcmbN4'

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertListings()
    await tearDownRemoteFirestoreTests()
  })

  beforeEach(async () => {
    const listing = (await findListingById(listingId)) as FirestoreListing
    initialState = listing.state
    initialExpiresAt = listing.expiresAt
    initialUpdatedAt = listing.updatedAt
  })
  afterEach(async () => {
    await updateListing(listingId, { state: initialState, expiresAt: initialExpiresAt, updatedAt: initialUpdatedAt })
  })

  it('throws if the listing is undefined', async () => {
    await expect(cancelListing('not-found')).rejects.toBeDefined()
  })
  it('throws if the listing is expired', async () => {
    await updateListing(listingId, { state: 'OPEN', expiresAt: dayjs().subtract(1, 'day') })
    await expect(cancelListing(listingId)).rejects.toBeDefined()
  })
  it('throws if the listing is cancelled', async () => {
    await updateListing(listingId, { state: 'CANCELLED', expiresAt: dayjs().add(1, 'day') })
    await expect(cancelListing(listingId)).rejects.toBeDefined()
  })
  it('throws if the listing is fulfilled', async () => {
    await updateListing(listingId, { state: 'FULFILLED', expiresAt: dayjs().add(1, 'day') })
    await expect(cancelListing(listingId)).rejects.toBeDefined()
  })
  it('throws if the listing is invalid', async () => {
    await updateListing(listingId, { state: 'INVALID', expiresAt: dayjs().add(1, 'day') })
    await expect(cancelListing(listingId)).rejects.toBeDefined()
  })
  it('cancel listing if its not expired', async () => {
    await updateListing(listingId, { state: 'OPEN', expiresAt: dayjs().add(1, 'day') })
    await cancelListing(listingId)
    const updatedListing = (await findListingById(listingId)) as FirestoreListing
    expect(updatedListing.state).toEqual('CANCELLED')
    expectDateIsNow(updatedListing.updatedAt)
  })
})
