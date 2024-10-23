import { listingSignature } from '@echo/model/helpers/listing/listing-signature'
import { getListingMock } from '@echo/model/mocks/listing/get-listing-mock'
import type { Listing } from '@echo/model/types/listing/listing'
import { describe, expect, test } from '@jest/globals'
import { assoc, modify, pipe, reverse } from 'ramda'

describe('helpers - listing - listingSignature', () => {
  test('returns the right listing signature', () => {
    const listing = getListingMock()
    expect(listingSignature(listing)).toBe('784d86d54465c2e002f1b54cdf9759da91cb9f78')
  })

  test('Should return the same listing signature even if the items are not in the same order', () => {
    const listing = pipe(getListingMock, modify('items', reverse))() as Listing
    expect(listingSignature(listing)).toBe('784d86d54465c2e002f1b54cdf9759da91cb9f78')
  })

  test('Should return the same listing if one prop of any indexes change', () => {
    const listing = pipe(getListingMock, modify('target', assoc('quantity', 100)))() as Listing
    expect(listingSignature(listing)).not.toBe('784d86d54465c2e002f1b54cdf9759da91cb9f78')
  })
})
