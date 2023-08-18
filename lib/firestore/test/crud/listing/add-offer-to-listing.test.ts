import { addOfferToListing } from '../../../src/crud/listing/add-offer-to-listing'
import { findListingById } from '../../../src/crud/listing/find-listing-by-id'
import { updateListing } from '../../../src/crud/listing/update-listing'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { Offer } from '../../../src/types/model/offer'
import { offerMock } from '../../mocks/offer-mock'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'

describe('CRUD - listing - addOfferToListing', () => {
  let initialOffers: Offer[]
  const id = 'jUzMtPGKM62mMhEcmbN4'

  beforeAll(initialize)
  afterAll(terminate)
  beforeEach(async () => {
    const listing = await findListingById(id)
    initialOffers = listing.offers!
  })
  afterEach(async () => {
    await updateListing(id, { offers: initialOffers })
  })

  it('addOfferToListing', async () => {
    const offer = offerMock['LyCfl6Eg7JKuD7XJ6IPi']!
    await addOfferToListing(id, offer)
    const newListing = await findListingById(id)
    expect(newListing.offers.length).toEqual(initialOffers.length + 1)
    expect(newListing.offers[initialOffers.length]).toStrictEqual(offer)
  })
})
