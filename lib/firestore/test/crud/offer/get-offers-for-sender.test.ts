import { getOffersForSender } from '@echo/firestore/crud/offer/get-offers-for-sender'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer - getOffersForSender', () => {
  it('return an empty array if the sender does not exist', async () => {
    const documents = await getOffersForSender('not-found')
    expect(documents).toEqual([])
  })
  it('returns the offers for the sender', async () => {
    let documents = await getOffersForSender(userMockCrewUsername())
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(getOfferMockById(offerMockToJohnnycageId()))
    documents = await getOffersForSender(userMockJohnnyUsername())
    expect(documents.length).toBe(0)
  })
})
