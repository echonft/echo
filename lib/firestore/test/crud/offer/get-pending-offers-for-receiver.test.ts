import { getPendingOffersForReceiver } from '@echo/firestore/crud/offer/get-pending-offers-for-receiver'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getPendingOffersForReceiver', () => {
  it('return an empty array if the receiver does not exist', async () => {
    const documents = await getPendingOffersForReceiver('not-found')
    expect(documents).toEqual([])
  })
  it('returns the pending offers for the receiver', async () => {
    let documents = await getPendingOffersForReceiver(userMockCrewUsername())
    expect(documents).toEqual([])
    documents = await getPendingOffersForReceiver(userMockJohnnyUsername())
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById(offerMockToJohnnycageId()))
  })
})
