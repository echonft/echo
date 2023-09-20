import { getListingsWithOfferId } from '@echo/firestore/crud/listing/get-listings-with-offer-id'
import { listingMock } from '@echo/firestore-mocks/listing-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - listing - getListingsWithOfferId', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns an empty array there are no listings with the given offer', async () => {
    const listings = await getListingsWithOfferId('not-found')
    expect(listings).toEqual([])
  })

  it('returns the listings when an id is found', async () => {
    const listings = await getListingsWithOfferId('LyCfl6Eg7JKuD7XJ6IPi')
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(listingMock['jUzMtPGKM62mMhEcmbN4'])
  })
})
