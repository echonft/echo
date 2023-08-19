import { collectionListingsLink } from '../../src/routing/collection-listings-link'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('../../src/routing/get-base-url')

describe('Routing - collectionListingsLink', () => {
  test('returns link for collection listings', () => {
    expect(collectionListingsLink('1')).toEqual('https://echonft.xyz/collection/1/listings')
  })
})
