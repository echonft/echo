import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { offerDocumentMockToJohnnycage } from '@echo/firestore/mocks/offer-document-mock'
import { offerDocumentMockToJohnnycageId } from '@echo/test/firestore/initialize-db'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - findOfferById', () => {
  it('returns undefined if the offer is not found', async () => {
    const offer = await getOfferById('not-found')
    expect(offer).toBeUndefined()
  })
  it('returns the offer with the given id', async () => {
    const offer = await getOfferById(offerDocumentMockToJohnnycageId)
    expect(offer).toStrictEqual(offerDocumentMockToJohnnycage)
  })
})
