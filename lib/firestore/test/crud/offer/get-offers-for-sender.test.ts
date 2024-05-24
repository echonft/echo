import { getOffersForSender } from '@echo/firestore/crud/offer/get-offers-for-sender'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OFFER_MOCK_FROM_JOHNNYCAGE_ID, OFFER_MOCK_TO_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'
import { USER_MOCK_CREW_USERNAME, USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getOffersForSender', () => {
  it('return an empty array if the sender does not exist', async () => {
    const documents = await getOffersForSender('not-found')
    expect(documents).toEqual([])
  })
  it('returns the offers for the sender', async () => {
    let documents = await getOffersForSender(USER_MOCK_CREW_USERNAME)
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById(OFFER_MOCK_TO_JOHNNYCAGE_ID))
    documents = await getOffersForSender(USER_MOCK_JOHNNY_USERNAME)
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById(OFFER_MOCK_FROM_JOHNNYCAGE_ID))
  })
})
