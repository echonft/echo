import { getCompletedOffersForUser } from '@echo/firestore/crud/offer/get-completed-offers-for-user'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OFFER_MOCK_FROM_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'
import { USER_MOCK_CREW_USERNAME, USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getCompletedOffersForUser', () => {
  it('return an empty array if the user does not exist', async () => {
    const documents = await getCompletedOffersForUser('not-found')
    expect(documents).toEqual([])
  })
  it('returns the completed offers for the user', async () => {
    let documents = await getCompletedOffersForUser(USER_MOCK_JOHNNY_USERNAME)
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById(OFFER_MOCK_FROM_JOHNNYCAGE_ID))
    documents = await getCompletedOffersForUser(USER_MOCK_CREW_USERNAME)
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById(OFFER_MOCK_FROM_JOHNNYCAGE_ID))
  })
})
