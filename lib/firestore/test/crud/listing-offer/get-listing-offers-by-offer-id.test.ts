import { getListingOffersByOfferId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-offer-id'
import { getListingOfferMocksByOfferId } from '@echo/firestore-mocks/listing-offer/get-listing-offer-mocks-by-offer-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { head } from 'ramda'

describe('CRUD - listing-offer - getListingOffersByOfferId', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  it('returns an empty array if the documents do not exist', async () => {
    const documents = await getListingOffersByOfferId('not-found')
    expect(documents.length).toBe(0)
  })
  it('returns the documents found', async () => {
    const offerId = 'ASkFpKoHEHVH0gd69t1G'
    const documents = await getListingOffersByOfferId(offerId)
    expect(documents.length).toBe(1)
    const listingOffer = head(documents)!
    expect(listingOffer).toStrictEqual(head(getListingOfferMocksByOfferId(offerId)))
  })
})
