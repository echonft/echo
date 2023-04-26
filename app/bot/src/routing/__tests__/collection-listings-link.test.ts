import { collectionListingsLink } from '../collection-listings-link'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('../get-base-url', () => ({
  getBaseUrl: () => 'https://echonft.xyz'
}))
describe('Routing - collectionListingsLink', () => {
  test('returns link for collection listings', () => {
    expect(collectionListingsLink('1')).toEqual('https://echonft.xyz/collection/1/listings')
  })
})
