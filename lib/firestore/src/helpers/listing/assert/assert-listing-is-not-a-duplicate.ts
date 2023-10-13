import { getListingsCollection } from '@echo/firestore/helpers/collection/get-listings-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { ListingTarget } from '@echo/model/types/listing-target'
import type { Nft } from '@echo/model/types/nft'
import type { OfferItem } from '@echo/model/types/offer-item'
import type { User } from '@echo/model/types/user'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { intersection, isEmpty, map, modify, path, pick } from 'ramda'

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

export async function assertListingIsNotADuplicate(
  items: NonEmptyArray<OfferItem>,
  targets: NonEmptyArray<ListingTarget>
) {
  const targetIds = map(path(['collection', 'id']), targets) as string[]
  const itemIds = map(path(['nft', 'id']), items) as string[]
  const querySnapshot = await getListingsCollection()
    .where('targetsIds', '==', targetIds)
    .where('itemsNftIds', '==', itemIds)
    .get()
  const documents = getQuerySnapshotDocumentsData(querySnapshot)
  if (!isEmpty(documents)) {
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
}
