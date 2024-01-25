import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { LISTING_STATES, READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import { type ListingItem } from '@echo/model/types/listing-item'
import type { ListingState } from '@echo/model/types/listing-state'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { type Nft } from '@echo/model/types/nft'
import { type OfferItem } from '@echo/model/types/offer-item'
import { type User } from '@echo/model/types/user'
import { stringComparator } from '@echo/utils/comparators/string-comparator'
import { isIn } from '@echo/utils/fp/is-in'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { now } from '@echo/utils/helpers/now'
import { intersection, map, modify, path, pick, pipe, reject, sort } from 'ramda'

interface PartialListingItem {
  amount: number
  nft: { id: string; owner: User }
}

function mapItems(items: ListingItem[]): PartialListingItem[] {
  return map<ListingItem, PartialListingItem>(
    modify<'nft', Nft, Pick<Nft, 'id' | 'owner'>>('nft', pick(['id', 'owner'])),
    items
  )
}

export async function assertListingIsNotADuplicate(items: OfferItem[], targets: ListingTarget[]) {
  const targetIds = pipe(
    map<ListingTarget, string>(nonNullableReturn(path(['collection', 'id']))),
    sort(stringComparator)
  )(targets)
  const itemIds = pipe(map<OfferItem, string>(nonNullableReturn(path(['nft', 'id']))), sort(stringComparator))(items)
  const documents = await pipe(
    getListingsCollectionReference,
    queryWhere('state', 'in', reject(isIn<ListingState>(READ_ONLY_LISTING_STATES), LISTING_STATES)),
    queryWhere('expiresAt', '>', now()),
    queryWhere('targetsIds', '==', targetIds),
    queryWhere('itemsNftIds', '==', itemIds),
    getQueryData
  )()
  // compare the items (e.g. the owner could be different)
  // only the owner and id are relevant in the item's nft
  const partialItems = mapItems(items)
  for (const document of documents) {
    const documentItems = mapItems(document.items)
    if (intersection(partialItems, documentItems).length === partialItems.length) {
      throw Error('listing is a duplicate')
    }
  }
}
