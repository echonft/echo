import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { listingMock } from '@echo/firestore-mocks/listing-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - listing - findListingById', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the listing is not found', async () => {
    const listing = await findListingById('not-found')
    expect(listing).toBeUndefined()
  })

  it('returns the listing with the given id', async () => {
    const listing = await findListingById('jUzMtPGKM62mMhEcmbN4')
    expect(listing).toStrictEqual(listingMock['jUzMtPGKM62mMhEcmbN4'])
  })
})
