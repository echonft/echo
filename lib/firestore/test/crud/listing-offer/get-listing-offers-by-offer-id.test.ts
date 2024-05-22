import { getListingOffersByOfferId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-offer-id'
import { getListingOfferMocksByOfferId } from '@echo/firestore-mocks/listing-offer/get-listing-offer-mocks-by-offer-id'
import { contentEq } from '@echo/utils/fp/content-eq'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing-offer - getListingOffersByOfferId', () => {
  it('returns an empty array if the documents do not exist', async () => {
    const documents = await getListingOffersByOfferId('not-found')
    expect(documents.length).toBe(0)
  })
  it('returns the documents found', async () => {
    const offerId = 'ASkFpKoHEHVH0gd69t1G'
    const documents = await getListingOffersByOfferId(offerId)
    expect(documents.length).toBe(1)
    expect(contentEq(documents, getListingOfferMocksByOfferId(offerId))).toBeTruthy()
  })
})
