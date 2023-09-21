import { getOfferItemsCollectionId } from '@echo/firestore/helpers/offer/get-offer-items-collection-id'
import { getOfferMockById } from '@echo/firestore-mocks/offer/get-offer-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - getOfferItemsCollectionId', () => {
  it('Returns the collection id of the items', () => {
    const { receiverItems } = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    expect(getOfferItemsCollectionId(receiverItems)).toEqual('1aomCtnoesD7WVll6Yi1')
  })
})
