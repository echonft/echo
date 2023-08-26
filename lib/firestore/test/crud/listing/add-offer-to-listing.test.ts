import { addOfferToListing } from '../../../src/crud/listing/add-offer-to-listing'
import { findListingById } from '../../../src/crud/listing/find-listing-by-id'
import { updateListing } from '../../../src/crud/listing/update-listing'
import { Listing } from '../../../src/types/model/listing'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'

describe('CRUD - listing - addOfferToListing', () => {
  let initialOffersIds: string[]
  const id = 'jUzMtPGKM62mMhEcmbN4'

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  beforeEach(async () => {
    const listing = (await findListingById(id)) as Listing
    initialOffersIds = listing.offersIds
    await updateListing(id, { offersIds: [] })
  })
  afterEach(async () => {
    await updateListing(id, { offersIds: initialOffersIds })
  })

  it('throws if the offer is not found', async () => {
    const listing = (await findListingById(id)) as Listing
    await expect(addOfferToListing(listing, 'not-found')).rejects.toBeDefined()
  })

  it('add offer id to listing if the offer exists and is not already in the listing', async () => {
    const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
    const listing = (await findListingById(id)) as Listing
    await addOfferToListing(listing, offerId)
    const updatedListing = (await findListingById(id)) as Listing
    expect(updatedListing.offersIds.length).toEqual(1)
    expect(updatedListing.offersIds[0]).toEqual(offerId)
    // throw if trying to add an offer id which is already in the listing
    await expect(addOfferToListing(updatedListing, offerId)).rejects.toBeDefined()
  })
})
