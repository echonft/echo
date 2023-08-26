import { addOfferToListing } from '../../../src/crud/listing/add-offer-to-listing'
import { findListingById } from '../../../src/crud/listing/find-listing-by-id'
import { updateListing } from '../../../src/crud/listing/update-listing'
import { Offer } from '../../../src/types/model/offer'
import { offerMock } from '../../mocks/offer-mock'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'

describe('CRUD - listing - addOfferToListing', () => {
  let initialOffers: Offer[]
  const id = 'jUzMtPGKM62mMhEcmbN4'

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  beforeEach(async () => {
    const listing = await findListingById(id)
    initialOffers = listing!.offers
  })
  afterEach(async () => {
    await updateListing(id, { offers: initialOffers })
  })

  it('addOfferToListing', async () => {
    const offer = offerMock['LyCfl6Eg7JKuD7XJ6IPi']!
    await addOfferToListing(id, offer)
    const newListing = await findListingById(id)
    expect(newListing!.offers.length).toEqual(initialOffers.length + 1)
    expect(newListing!.offers[initialOffers.length]).toStrictEqual(offer)
  })
})
