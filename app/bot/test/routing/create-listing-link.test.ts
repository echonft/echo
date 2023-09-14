import { createListingLink } from '@echo/bot/routing/create-listing-link'
import { describe, expect, test } from '@jest/globals'

describe('Routing - createListingLink', () => {
  test('returns link for collection listing creation', () => {
    expect(createListingLink('1')).toEqual('https://echonft.xyz/collection/1/listings/create')
  })
})
