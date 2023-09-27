import { getOfferItemsCollectionIds } from '@echo/firestore/helpers/offer/get-offer-items-collection-ids'
import { getOfferMockById } from '@echo/firestore-mocks/offer/get-offer-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - getOfferItemsCollectionIds', () => {
  it('Returns the collection ids of the items', () => {
    const { receiverItems, senderItems } = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    expect(getOfferItemsCollectionIds(receiverItems)).toEqual(['1aomCtnoesD7WVll6Yi1'])
    expect(getOfferItemsCollectionIds(senderItems)).toEqual(['Rc8pLQXxgyQGIRL0fr13'])
  })
})
