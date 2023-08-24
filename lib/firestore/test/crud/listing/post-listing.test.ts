import { findListingById } from '../../../src/crud/listing/find-listing-by-id'
import { postListing } from '../../../src/crud/listing/post-listing'
import { updateListing } from '../../../src/crud/listing/update-listing'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs, { Dayjs } from 'dayjs'

describe('CRUD - listing - postListing', () => {
  let initialPostedAt: Dayjs
  const id = 'jUzMtPGKM62mMhEcmbN4'

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  beforeEach(async () => {
    const listing = await findListingById(id)
    initialPostedAt = listing!.postedAt!
  })
  afterEach(async () => {
    await updateListing(id, { postedAt: initialPostedAt })
  })

  it('postListing', async () => {
    await postListing(id)
    const postedListing = await findListingById(id)
    expect(postedListing!.postedAt?.isAfter(dayjs().subtract(1, 'minute'))).toBeTruthy()
    expect(postedListing!.postedAt?.isBefore(dayjs().add(1, 'minute'))).toBeTruthy()
  })
})
