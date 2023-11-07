import { assertItems } from '@echo/model/helpers/item/assert/assert-items'
import { type ListingItem } from '@echo/model/types/listing-item'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

/**
 * Asserts the validity of offer items
 * @param items
 */
export function assertListingItems(items: ListingItem[]): asserts items is NonEmptyArray<ListingItem> {
  assertItems(items)
}
