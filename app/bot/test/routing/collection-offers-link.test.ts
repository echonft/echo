import { collectionOffersLink } from '@echo/bot/routing/collection-offers-link'
import { describe, expect, test } from '@jest/globals'

describe('Routing - collectionOffersLink', () => {
  test('returns link for collection offers', () => {
    expect(collectionOffersLink('1')).toEqual('https://echonft.xyz/collection/1/offers')
  })
})
