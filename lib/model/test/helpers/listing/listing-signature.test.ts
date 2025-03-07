import { listingSignature } from '@echo/model/helpers/listing/listing-signature'
import { listingMock } from '@echo/model/mocks/listing-mock'
import type { Listing } from '@echo/model/types/listing'
import { describe, expect, test } from '@jest/globals'
import { assoc, modify, reverse } from 'ramda'

describe('helpers - listing - listingSignature', () => {
  test('returns the right listing signature', () => {
    expect(listingSignature(listingMock)).toBe('912033ed05750bcf8aa74126011cbdef5a907424')
  })

  test('Should return the same listing signature even if the items are not in the same order', () => {
    const listing = modify<Listing, 'items', Listing['items']>('items', reverse, listingMock)
    expect(listingSignature(listing)).toBe('912033ed05750bcf8aa74126011cbdef5a907424')
  })

  test('Should return the same listing if one prop of any indexes change', () => {
    const listing = modify('target', assoc('quantity', 100), listingMock)
    expect(listingSignature(listing)).not.toBe('912033ed05750bcf8aa74126011cbdef5a907424')
  })
})
