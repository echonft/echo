import { getPendingOffersForReceiver } from '@echo/firestore/crud/offer/get-pending-offers-for-receiver'
import { offerDocumentMockToJohnnycage } from '@echo/firestore/mocks/offer-document-mock'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getPendingOffersForReceiver', () => {
  it('return an empty array if the receiver does not exist', async () => {
    const documents = await getPendingOffersForReceiver('not-found')
    expect(documents).toEqual([])
  })
  it('returns the pending offers for the receiver', async () => {
    let documents = await getPendingOffersForReceiver(userMockCrew.username)
    expect(documents).toEqual([])
    documents = await getPendingOffersForReceiver(userMockJohnny.username)
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(offerDocumentMockToJohnnycage)
  })
})
