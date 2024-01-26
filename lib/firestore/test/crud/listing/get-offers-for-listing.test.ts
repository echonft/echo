import { getPendingOffersForListing } from '@echo/firestore/crud/offer/get-pending-offers-for-listing'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { ListingOfferFill } from '@echo/model/constants/listing-offer-fill'
import { getListingMock } from '@echo/model-mocks/listing/get-listing-mock'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assoc, pipe } from 'ramda'

describe('CRUD - listing - getPendingListingsForCollection', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns the offers that partially or completely fulfill a given listing', async () => {
    const listing = getListingMock()
    const offers = await getPendingOffersForListing(listing)
    expect(offers.length).toBe(1)
    const expected = pipe(
      getOfferMockById,
      assoc('listing', listing),
      assoc('fill', ListingOfferFill.PARTIAL)
    )('LyCfl6Eg7JKuD7XJ6IPi')
    expect(offers[0]).toStrictEqual(expected)
  })
})
