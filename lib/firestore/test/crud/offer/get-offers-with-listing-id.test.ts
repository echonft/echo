import { getOffersWithListingId } from '@echo/firestore/crud/offer/get-offers-with-listing-id'
import { getOfferMockById } from '@echo/firestore-mocks/offer/get-offer-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - offer - getOffersWithListingId', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns an empty array there are no offer with the given listing', async () => {
    const listings = await getOffersWithListingId('not-found')
    expect(listings).toEqual([])
  })

  it('returns the offers when an id is found', async () => {
    const offers = await getOffersWithListingId('jUzMtPGKM62mMhEcmbN4')
    expect(offers.length).toBe(1)
    expect(offers[0]).toStrictEqual(getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'))
  })
})
