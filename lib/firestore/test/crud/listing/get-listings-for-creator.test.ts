import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getListingsForCreator', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns an empty array if the user does not exist', async () => {
    const listings = await getListingsForCreator('not-found')
    expect(listings).toEqual([])
  })

  it('returns the listings created by the user', async () => {
    let listings = await getListingsForCreator('crewnft_')
    expect(listings).toEqual([])
    listings = await getListingsForCreator('johnnycagewins')
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(getListingMockById('jUzMtPGKM62mMhEcmbN4'))
  })
})
