import { addListingToOffer } from '../../../src/crud/offer/add-listing-to-offer'
import { findOfferById } from '../../../src/crud/offer/find-offer-by-id'
import { updateOffer } from '../../../src/crud/offer/update-offer'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { Offer } from '@echo/firestore-types'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'

describe('CRUD - offer - addListingToOffer', () => {
  let initialListingIds: string[]
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  beforeEach(async () => {
    const offer = (await findOfferById(id)) as Offer
    initialListingIds = offer.listingsIds
    await updateOffer(id, { listingsIds: [] })
  })
  afterEach(async () => {
    await updateOffer(id, { listingsIds: initialListingIds })
  })

  it('throws if the listing is not found', async () => {
    const offer = (await findOfferById(id)) as Offer
    await expect(addListingToOffer(offer, 'not-found')).rejects.toBeDefined()
  })

  it('add listing id if the listing exists and is not already in the offer', async () => {
    const offer = (await findOfferById(id)) as Offer
    const listingId = 'jUzMtPGKM62mMhEcmbN4'
    await addListingToOffer(offer, listingId)
    const updatedOffer = (await findOfferById(id)) as Offer
    expect(updatedOffer.listingsIds.length).toEqual(1)
    expect(updatedOffer.listingsIds[0]).toEqual(listingId)
    // throw if trying to add an offer id which is already in the listing
    await expect(addListingToOffer(updatedOffer, listingId)).rejects.toBeDefined()
  })
})
