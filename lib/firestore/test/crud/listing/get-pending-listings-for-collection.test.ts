import { getPendingListingsForCollection } from '@echo/firestore/crud/listing/get-pending-listings-for-collection'
import { assertListings } from '@echo/firestore-test/listing/assert-listings'
import { unchecked_updateListing } from '@echo/firestore-test/listing/unchecked_update-listing'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { LISTING_STATE_FULFILLED } from '@echo/model/constants/listing-states'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getPendingListingsForCollection', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await unchecked_updateListing('jUzMtPGKM62mMhEcmbN4', { state: getListingMockById('jUzMtPGKM62mMhEcmbN4').state })
    await assertListings()
    await tearDownRemoteFirestoreTests()
  })

  it('returns an empty array if the collection does not exist', async () => {
    const listings = await getPendingListingsForCollection('not-found')
    expect(listings).toEqual([])
  })

  it('returns the pending listings for which the collection is included in the targets or items', async () => {
    let listings = await getPendingListingsForCollection('pxmythics-genesis')
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(getListingMockById('jUzMtPGKM62mMhEcmbN4'))
    listings = await getPendingListingsForCollection('spiral-frequencies')
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(getListingMockById('jUzMtPGKM62mMhEcmbN4'))
    await unchecked_updateListing('jUzMtPGKM62mMhEcmbN4', { state: LISTING_STATE_FULFILLED })
    listings = await getPendingListingsForCollection('pxmythics-genesis')
    expect(listings).toEqual([])
    listings = await getPendingListingsForCollection('spiral-frequencies')
    expect(listings).toEqual([])
  })
})
