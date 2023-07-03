import { collectionOffersLink } from '../../src/routing/collection-offers-link'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('../../src/routing/get-base-url')

describe('Routing - collectionOffersLink', () => {
  test('returns link for collection offers', () => {
    expect(collectionOffersLink('1')).toEqual('https://echonft.xyz/collection/1/offers')
  })
})
