import { findListingByCreator } from '../../../src/crud/listing/find-listing-by-creator'
import { listingMock } from '../../mocks/listing-mock'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - listing - findListingByCreator', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns undefined if the listing is not found', async () => {
    const listing = await findListingByCreator('not-found')
    expect(listing).toBeUndefined()
  })

  it('returns the listing with the given id', async () => {
    const listing = await findListingByCreator('oE6yUEQBPn7PZ89yMjKn')
    expect(listing).toStrictEqual(listingMock['jUzMtPGKM62mMhEcmbN4'])
  })
})
