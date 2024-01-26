import { getListingOffersForOffer } from '@echo/firestore/crud/offer/get-listing-offers-for-offer'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { ListingOfferFill } from '@echo/model/constants/listing-offer-fill'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getListingOffersForListing', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns the listing offers for a given offer', async () => {
    const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    const listingOffers = await getListingOffersForOffer(offer)
    expect(listingOffers.length).toBe(1)
    expect(listingOffers[0]).toStrictEqual({
      offer,
      listing: getListingMockById('jUzMtPGKM62mMhEcmbN4'),
      fill: ListingOfferFill.PARTIAL
    })
  })
})
