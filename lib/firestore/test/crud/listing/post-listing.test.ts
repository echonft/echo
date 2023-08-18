import { findListingById } from '../../../src/crud/listing/find-listing-by-id'
import { postListing } from '../../../src/crud/listing/post-listing'
import { updateListing } from '../../../src/crud/listing/update-listing'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs, { Dayjs } from 'dayjs'

describe('CRUD - listing - postListing', () => {
  let initialPostedAt: Dayjs
  const id = 'jUzMtPGKM62mMhEcmbN4'

  beforeAll(initialize)
  afterAll(terminate)
  beforeEach(async () => {
    const listing = await findListingById(id)
    initialPostedAt = listing.postedAt!
  })
  afterEach(async () => {
    await updateListing(id, { postedAt: initialPostedAt })
  })

  it('postListing', async () => {
    await postListing(id)
    const postedListing = await findListingById(id)
    expect(postedListing.postedAt?.isAfter(dayjs().subtract(1, 'minute'))).toBeTruthy()
    expect(postedListing.postedAt?.isBefore(dayjs().add(1, 'minute'))).toBeTruthy()
  })
})
