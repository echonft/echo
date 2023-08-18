import { cancelListing } from '../../../src/crud/listing/cancel-listing'
import { findListingById } from '../../../src/crud/listing/find-listing-by-id'
import { updateListing } from '../../../src/crud/listing/update-listing'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { ListingState } from '../../../src/types/model/listing-state'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'

describe('CRUD - listing - cancelListing', () => {
  let initialState: ListingState
  const id = 'jUzMtPGKM62mMhEcmbN4'

  beforeAll(initialize)
  afterAll(terminate)
  beforeEach(async () => {
    const listing = await findListingById(id)
    initialState = listing.state
  })
  afterEach(async () => {
    await updateListing(id, { state: initialState })
  })

  it('cancelListing', async () => {
    await cancelListing(id)
    const updatedListing = await findListingById(id)
    expect(updatedListing.state).toEqual('CANCELLED')
  })
})
