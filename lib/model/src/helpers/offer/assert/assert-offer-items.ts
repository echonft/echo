import { assertItems } from '@echo/model/helpers/item/assert/assert-items'
import { type OfferItem } from '@echo/model/types/offer-item'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'

/**
 * Asserts the validity of offer items
 * @param items
 */
export function assertOfferItems(items: OfferItem[]): asserts items is NonEmptyArray<OfferItem> {
  assertItems(items)
}
