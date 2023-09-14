import { offerLink } from '@echo/bot/routing/offer-link'
import { getOfferMockById } from '@echo/firestore-mocks/get-offer-mock-by-id'
import { describe, expect, test } from '@jest/globals'

describe('Routing - offerLink', () => {
  const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
  test('returns link with offer', () => {
    expect(offerLink(offer)).toEqual(`https://echonft.xyz/offers/${offer.id}`)
  })
})
