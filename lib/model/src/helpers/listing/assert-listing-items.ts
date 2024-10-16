import { asserErc1155ItemsQuantity } from '@echo/model/helpers/item/assert-erc1155-items-quantity'
import { assertItemsChain } from '@echo/model/helpers/item/assert-items-chain'
import { assertItemsNotEmpty } from '@echo/model/helpers/item/assert-items-not-empty'
import { assertUniqErc1155Items } from '@echo/model/helpers/item/assert-uniq-erc1155-items'
import { assertUniqErc721Items } from '@echo/model/helpers/item/assert-uniq-erc721-items'
import type { Listing } from '@echo/model/types/listing/listing'
import { pipe } from 'ramda'

/**
 * Asserts the validity of items
 * @param items
 */
export function assertListingItems(items: Listing['items']) {
  pipe(
    assertItemsNotEmpty,
    assertUniqErc721Items,
    assertUniqErc1155Items,
    assertItemsChain,
    asserErc1155ItemsQuantity
  )(items)
}
