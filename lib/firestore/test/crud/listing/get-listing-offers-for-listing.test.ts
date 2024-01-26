import { getListingOffersForListing } from '@echo/firestore/crud/listing/get-listing-offers-for-listing'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { ListingOfferFill } from '@echo/model/constants/listing-offer-fill'
import { getListingMock } from '@echo/model-mocks/listing/get-listing-mock'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getListingOffersForListing', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns the listing offers for a given listing', async () => {
    const listing = getListingMock()
    const listingOffers = await getListingOffersForListing(listing)
    expect(listingOffers.length).toBe(1)
    expect(listingOffers[0]).toStrictEqual({
      offer: getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'),
      listing,
      fill: ListingOfferFill.PARTIAL
    })
  })
})
