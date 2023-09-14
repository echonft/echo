import { collectionLink } from '@echo/bot/routing/collection-link'
import { describe, expect, test } from '@jest/globals'

describe('Routing - collectionLink', () => {
  test('returns link for collection', () => {
    expect(collectionLink('1')).toEqual('https://echonft.xyz/collection/1')
  })
})
