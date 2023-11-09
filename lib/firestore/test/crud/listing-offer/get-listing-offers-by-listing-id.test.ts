import { getListingOffersByListingId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing-id'
import { getListingOfferMocksByOfferId } from '@echo/firestore-mocks/listing-offer/get-listing-offer-mocks-by-offer-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { head } from 'ramda'

describe('CRUD - listing-offer - getListingOffersByListingId', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  it('returns an empty array if the documents do not exist', async () => {
    const documents = await getListingOffersByListingId('not-found')
    expect(documents.length).toBe(0)
  })
  it('returns the documents found', async () => {
    const listingId = 'jUzMtPGKM62mMhEcmbN4'
    const documents = await getListingOffersByListingId(listingId)
    expect(documents.length).toBe(2)
    for (const document of documents) {
      expect(document).toStrictEqual(head(getListingOfferMocksByOfferId(document.offerId)))
    }
  })
})
