import { getListingOffersByListingId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing-id'
import { getListingOfferMocksByListingId } from '@echo/firestore/mocks/listing-offer/get-listing-offer-mocks-by-listing-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import { eqList } from '@echo/utils/fp/eq-list'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing-offer - getListingOffersByListingId', () => {
  it('returns an empty array if the documents do not exist', async () => {
    const documents = await getListingOffersByListingId('not-found')
    expect(documents.length).toBe(0)
  })
  it('returns the documents found', async () => {
    const listingId = listingMockId()
    const documents = await getListingOffersByListingId(listingId)
    expect(documents.length).toBe(2)
    expect(eqList(documents, getListingOfferMocksByListingId(listingId))).toBeTruthy()
  })
})
