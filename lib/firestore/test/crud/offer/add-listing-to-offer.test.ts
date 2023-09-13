import { addListingToOffer } from '@echo/firestore/crud/offer/add-listing-to-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { updateOffer } from '@echo/firestore/crud/offer/update-offer'
import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - offer - addListingToOffer', () => {
  let initialListingIds: string[]
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  beforeEach(async () => {
    const offer = (await findOfferById(id)) as FirestoreOffer
    initialListingIds = offer.listingsIds
    await updateOffer(id, { listingsIds: [] })
  })
  afterEach(async () => {
    await updateOffer(id, { listingsIds: initialListingIds })
  })

  it('throws if the listing is not found', async () => {
    const offer = (await findOfferById(id)) as FirestoreOffer
    await expect(addListingToOffer(offer, 'not-found')).rejects.toBeDefined()
  })

  it('add listing id if the listing exists and is not already in the offer', async () => {
    const offer = (await findOfferById(id)) as FirestoreOffer
    const listingId = 'jUzMtPGKM62mMhEcmbN4'
    await addListingToOffer(offer, listingId)
    const updatedOffer = (await findOfferById(id)) as FirestoreOffer
    expect(updatedOffer.listingsIds.length).toEqual(1)
    expect(updatedOffer.listingsIds[0]).toEqual(listingId)
    // throw if trying to add an offer id which is already in the listing
    await expect(addListingToOffer(updatedOffer, listingId)).rejects.toBeDefined()
  })
})
