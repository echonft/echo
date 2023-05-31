import { describe, expect, jest, test } from '@jest/globals'
import { collectionListingsLink } from '../../src/routing/collection-listings-link'

jest.mock('../../src/routing/get-base-url')

describe('Routing - collectionListingsLink', () => {
  test('returns link for collection listings', () => {
    expect(collectionListingsLink('1')).toEqual('https://echonft.xyz/collection/1/listings')
  })
})
