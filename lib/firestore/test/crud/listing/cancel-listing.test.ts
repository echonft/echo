import { cancelListing } from '../../../src/crud/listing/cancel-listing'
import { findListingById } from '../../../src/crud/listing/find-listing-by-id'
import { updateListing } from '../../../src/crud/listing/update-listing'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { ListingState } from '../../../src/types/model/listing-state'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs, { Dayjs } from 'dayjs'

describe('CRUD - listing - cancelListing', () => {
  let initialState: ListingState
  let initialExpiresAt: Dayjs
  const id = 'jUzMtPGKM62mMhEcmbN4'

  beforeAll(initialize)
  afterAll(terminate)
  beforeEach(async () => {
    const listing = await findListingById(id)
    initialState = listing!.state
    initialExpiresAt = listing!.expiresAt
  })
  afterEach(async () => {
    await updateListing(id, { state: initialState, expiresAt: initialExpiresAt })
  })

  it('throws if the listing is expired', async () => {
    try {
      await cancelListing(id)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as Error).message).toEqual('listing expired')
    }
  })

  it('cancel listing if its not expired', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await updateListing(id, { expiresAt: dayjs().add(1, 'day') })
    await cancelListing(id)
    const updatedListing = await findListingById(id)
    expect(updatedListing!.state).toEqual('CANCELLED')
  })
})
