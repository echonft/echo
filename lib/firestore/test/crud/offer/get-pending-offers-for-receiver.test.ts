import { getPendingOffersForReceiver } from '@echo/firestore/crud/offer/get-pending-offers-for-receiver'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OFFER_MOCK_TO_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'
import { USER_MOCK_CREW_USERNAME, USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getPendingOffersForReceiver', () => {
  it('return an empty array if the receiver does not exist', async () => {
    const documents = await getPendingOffersForReceiver('not-found')
    expect(documents).toEqual([])
  })
  it('returns the pending offers for the receiver', async () => {
    let documents = await getPendingOffersForReceiver(USER_MOCK_CREW_USERNAME)
    expect(documents).toEqual([])
    documents = await getPendingOffersForReceiver(USER_MOCK_JOHNNY_USERNAME)
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById(OFFER_MOCK_TO_JOHNNYCAGE_ID))
  })
})
