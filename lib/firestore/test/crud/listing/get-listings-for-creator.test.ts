import { getListingsForCreator } from '../../../src/crud/listing/get-listings-for-creator'
import { getListingMockById } from '../../mocks/get-listing-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getListingsForCreator', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns an empty array if no listings are found', async () => {
    const listings = await getListingsForCreator('not-found')
    expect(listings).toEqual([])
  })

  it('returns the listings for the creator', async () => {
    const listings = await getListingsForCreator('oE6yUEQBPn7PZ89yMjKn')
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(getListingMockById('jUzMtPGKM62mMhEcmbN4'))
  })
})
