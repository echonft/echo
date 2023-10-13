import { getListingsCollection } from '@echo/firestore/helpers/collection/get-listings-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { FirestoreListingItem } from '@echo/firestore/types/model/listing/firestore-listing-item'
import { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { intersection, isEmpty, map, modify, path, pick } from 'ramda'

interface PartialListingItem {
  amount: number
  nft: { id: string; owner: FirestoreUserDetails }
}

function mapItems(items: FirestoreListingItem[]): PartialListingItem[] {
  return map<FirestoreListingItem, PartialListingItem>(
    modify<'nft', FirestoreNft, Pick<FirestoreNft, 'id' | 'owner'>>('nft', pick(['id', 'owner'])),
    items
  )
}

export async function assertListingIsNotADuplicate(
  items: NonEmptyArray<FirestoreOfferItem>,
  targets: NonEmptyArray<FirestoreListingTarget>
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
