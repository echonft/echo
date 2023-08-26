import { cancelListing } from '../../../src/crud/listing/cancel-listing'
import { findListingById } from '../../../src/crud/listing/find-listing-by-id'
import { updateListing } from '../../../src/crud/listing/update-listing'
import { ListingState } from '../../../src/types/model/listing-state'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs, { Dayjs } from 'dayjs'

describe('CRUD - listing - cancelListing', () => {
  let initialState: ListingState
  let initialExpiresAt: Dayjs
  const id = 'jUzMtPGKM62mMhEcmbN4'

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  beforeEach(async () => {
    const listing = await findListingById(id)
    initialState = listing!.state
    initialExpiresAt = listing!.expiresAt
  })
  afterEach(async () => {
    await updateListing(id, { state: initialState, expiresAt: initialExpiresAt })
  })

  it('throws if the listing is undefined', async () => {
    await expect(cancelListing('not-found')).rejects.toBeDefined()
  })
  it('throws if the listing is expired', async () => {
    await updateListing(id, { state: 'OPEN', expiresAt: dayjs().subtract(1, 'day') })
    await expect(cancelListing(id)).rejects.toBeDefined()
  })
  it('throws if the listing is cancelled', async () => {
    await updateListing(id, { state: 'CANCELLED', expiresAt: dayjs().add(1, 'day') })
    await expect(cancelListing(id)).rejects.toBeDefined()
  })
  it('throws if the listing is fulfilled', async () => {
    await updateListing(id, { state: 'FULFILLED', expiresAt: dayjs().add(1, 'day') })
    await expect(cancelListing(id)).rejects.toBeDefined()
  })
  it('throws if the listing is invalid', async () => {
    await updateListing(id, { state: 'INVALID', expiresAt: dayjs().add(1, 'day') })
    await expect(cancelListing(id)).rejects.toBeDefined()
  })

  it('cancel listing if its not expired', async () => {
    await updateListing(id, { state: 'OPEN', expiresAt: dayjs().add(1, 'day') })
    await cancelListing(id)
    const updatedListing = await findListingById(id)
    expect(updatedListing!.state).toEqual('CANCELLED')
  })
})
