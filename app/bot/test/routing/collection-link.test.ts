import { describe, expect, jest, test } from '@jest/globals'
import { collectionLink } from '../../src/routing/collection-link'

jest.mock('../../src/routing/get-base-url')

describe('Routing - collectionLink', () => {
  test('returns link for collection', () => {
    expect(collectionLink('1')).toEqual('https://echonft.xyz/collection/1')
  })
})
