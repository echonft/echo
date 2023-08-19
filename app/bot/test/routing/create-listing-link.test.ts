import { createListingLink } from '../../src/routing/create-listing-link'
import { describe, expect, jest, test } from '@jest/globals'

jest.mock('../../src/routing/get-base-url')

describe('Routing - createListingLink', () => {
  test('returns link for collection listing creation', () => {
    expect(createListingLink('1')).toEqual('https://echonft.xyz/collection/1/listings/create')
  })
})
