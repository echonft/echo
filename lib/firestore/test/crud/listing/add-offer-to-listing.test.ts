import { addOfferToListing } from '@echo/firestore/crud/listing/add-offer-to-listing'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { updateListing } from '@echo/firestore/crud/listing/update-listing'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertListings } from '@test-utils/listing/assert-listings'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - listing - addOfferToListing', () => {
  let initialOffersIds: string[]
  const id = 'jUzMtPGKM62mMhEcmbN4'

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertListings()
    await tearDownRemoteFirestoreTests()
  })

  beforeEach(async () => {
    const listing = (await findListingById(id)) as FirestoreListing
    initialOffersIds = listing.offersIds
    await updateListing(id, { offersIds: [] })
  })
  afterEach(async () => {
    await updateListing(id, { offersIds: initialOffersIds })
  })

  it('throws if the offer is not found', async () => {
    const listing = (await findListingById(id)) as FirestoreListing
    await expect(addOfferToListing(listing, 'not-found')).rejects.toBeDefined()
  })

  it('add offer id to listing if the offer exists and is not already in the listing', async () => {
    const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
    const listing = (await findListingById(id)) as FirestoreListing
    await addOfferToListing(listing, offerId)
    const updatedListing = (await findListingById(id)) as FirestoreListing
    expect(updatedListing.offersIds.length).toEqual(1)
    expect(updatedListing.offersIds[0]).toEqual(offerId)
    // throw if trying to add an offer id which is already in the listing
    await expect(addOfferToListing(updatedListing, offerId)).rejects.toBeDefined()
  })
})
