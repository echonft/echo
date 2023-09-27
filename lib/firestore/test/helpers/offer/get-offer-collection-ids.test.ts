import { getOfferCollectionIds } from '@echo/firestore/helpers/offer/get-offer-collection-ids'
import { getOfferMockById } from '@echo/firestore-mocks/offer/get-offer-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - getOfferCollectionIds', () => {
  it('Returns the collection ids of the all the items (both receiver and sender) in an offer', () => {
    expect(getOfferCollectionIds(getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'))).toEqual([
      '1aomCtnoesD7WVll6Yi1',
      'Rc8pLQXxgyQGIRL0fr13'
    ])
  })
})
