import { getCompletedOffersForUser } from '@echo/firestore/crud/offer/get-completed-offers-for-user'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { offerMockFromJohnnycageId } from '@echo/model-mocks/offer/offer-mock'
import { userMockCrewUsername, userMockJohnnyUsername } from '@echo/model-mocks/user/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getCompletedOffersForUser', () => {
  it('return an empty array if the user does not exist', async () => {
    const documents = await getCompletedOffersForUser('not-found')
    expect(documents).toEqual([])
  })
  it('returns the completed offers for the user', async () => {
    let documents = await getCompletedOffersForUser(userMockJohnnyUsername())
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById(offerMockFromJohnnycageId()))
    documents = await getCompletedOffersForUser(userMockCrewUsername())
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById(offerMockFromJohnnycageId()))
  })
})
