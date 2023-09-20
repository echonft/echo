import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { invalidateListing } from '@echo/firestore/crud/listing/invalidate-listing'
import { updateListing } from '@echo/firestore/crud/listing/update-listing'
import type { FirestoreListingState } from '@echo/firestore/types/model/firestore-listing-state'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertListings } from '@test-utils/assert-listings'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'

describe('CRUD - listing - invalidateListing', () => {
  let initialState: FirestoreListingState
  let initialExpiresAt: dayjs.Dayjs
  const id = 'jUzMtPGKM62mMhEcmbN4'

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertListings()
    await tearDownRemoteFirestoreTests()
  })

  beforeEach(async () => {
    const listing = await findListingById(id)
    initialState = listing!.state
    initialExpiresAt = listing!.expiresAt
  })
  afterEach(async () => {
    await updateListing(id, { state: initialState, expiresAt: initialExpiresAt })
  })

  it('throws if the listing is undefined', async () => {
    await expect(invalidateListing('not-found')).rejects.toBeDefined()
  })
  it('throws if the listing is expired', async () => {
    await updateListing(id, { state: 'OPEN', expiresAt: dayjs().subtract(1, 'day') })
    await expect(invalidateListing(id)).rejects.toBeDefined()
  })
  it('throws if the listing is cancelled', async () => {
    await updateListing(id, { state: 'CANCELLED', expiresAt: dayjs().add(1, 'day') })
    await expect(invalidateListing(id)).rejects.toBeDefined()
  })
  it('throws if the listing is fulfilled', async () => {
    await updateListing(id, { state: 'FULFILLED', expiresAt: dayjs().add(1, 'day') })
    await expect(invalidateListing(id)).rejects.toBeDefined()
  })
  it('throws if the listing is invalid', async () => {
    await updateListing(id, { state: 'INVALID', expiresAt: dayjs().add(1, 'day') })
    await expect(invalidateListing(id)).rejects.toBeDefined()
  })

  it('invalidate listing if its not expired', async () => {
    await updateListing(id, { state: 'OPEN', expiresAt: dayjs().add(1, 'day') })
    await invalidateListing(id)
    const updatedListing = await findListingById(id)
    expect(updatedListing!.state).toEqual('INVALID')
  })
})
