import { collectionLink } from '../collection-link'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('../get-base-url', () => ({
  getBaseUrl: () => 'https://echonft.xyz'
}))
describe('Routing - collectionLink', () => {
  test('returns link for collection', () => {
    expect(collectionLink('1')).toEqual('https://echonft.xyz/collection/1')
  })
})
