import { collectionListingsLink } from '@echo/bot/routing/collection-listings-link'
import { describe, expect, test } from '@jest/globals'

describe('Routing - collectionListingsLink', () => {
  test('returns link for collection listings', () => {
    expect(collectionListingsLink('1')).toEqual('https://echonft.xyz/collection/1/listings')
  })
})
