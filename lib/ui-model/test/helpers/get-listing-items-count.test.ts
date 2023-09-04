import { getListingItemsCount } from '../../src/helpers/get-listing-items-count'
import { ListingItem } from '../../src/types/listing-item'
import { ListingTarget } from '../../src/types/listing-target'
import { describe, expect, it } from '@jest/globals'

describe('helpers - getListingItemsCount', () => {
  it('returns 0 if both targets and items are empty', () => {
    expect(getListingItemsCount({ items: [], targets: [] })).toBe(0)
  })

  it('returns targets length if items is empty', () => {
    expect(getListingItemsCount({ items: [], targets: [''] as unknown as ListingTarget[] })).toBe(1)
    expect(getListingItemsCount({ items: [], targets: ['', ''] as unknown as ListingTarget[] })).toBe(2)
  })

  it('returns items length if target is empty', () => {
    expect(getListingItemsCount({ items: [''] as unknown as ListingItem[], targets: [] })).toBe(1)
    expect(getListingItemsCount({ items: ['', ''] as unknown as ListingItem[], targets: [] })).toBe(2)
  })

  it('returns items length if both items and targets have items', () => {
    expect(
      getListingItemsCount({ items: [''] as unknown as ListingItem[], targets: ['', ''] as unknown as ListingTarget[] })
    ).toBe(1)
    expect(
      getListingItemsCount({ items: ['', ''] as unknown as ListingItem[], targets: [''] as unknown as ListingTarget[] })
    ).toBe(2)
  })
})
