import { offerLink } from '../../src/routing/offer-link'
import { getOfferMockById } from '@echo/firestore'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('../../src/routing/get-base-url')

describe('Routing - offerLink', () => {
  const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
  test('returns link with offer', () => {
    expect(offerLink(offer)).toEqual(`https://echonft.xyz/offers/${offer.id}`)
  })
})
