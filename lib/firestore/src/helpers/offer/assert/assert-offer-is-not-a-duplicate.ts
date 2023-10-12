import { getOffersCollection } from '@echo/firestore/helpers/collection/get-offers-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { intersection, isEmpty, map, modify, path, pick } from 'ramda'

interface PartialOfferItem {
  amount: number
  nft: { id: string; owner: FirestoreUserDetails }
}

function mapItems(items: FirestoreOfferItem[]): PartialOfferItem[] {
  return map<FirestoreOfferItem, PartialOfferItem>(
    modify<'nft', FirestoreNft, Pick<FirestoreNft, 'id' | 'owner'>>('nft', pick(['id', 'owner'])),
    items
  )
}

export async function assertOfferIsNotADuplicate(
  senderItems: NonEmptyArray<FirestoreOfferItem>,
  receiverItems: NonEmptyArray<FirestoreOfferItem>
) {
  const receiverItemsNftIds = map(path(['nft', 'id']), receiverItems) as string[]
  const senderItemsNftIds = map(path(['nft', 'id']), senderItems) as string[]
  const querySnapshot = await getOffersCollection()
    .where('receiverItemsNftIds', '==', receiverItemsNftIds)
    .where('senderItemsNftIds', '==', senderItemsNftIds)
    .get()
  const documents = getQuerySnapshotDocumentsData(querySnapshot)
  if (!isEmpty(documents)) {
    // compare the items (e.g. the owner could be different)
    // only the owner and id are relevant in the items nft
    const partialReceiverItems = mapItems(receiverItems)
    const partialSenderItems = mapItems(senderItems)
    for (const document of documents) {
      const documentReceiverItems = mapItems(document.receiverItems)
      const documentSenderItems = mapItems(document.senderItems)
      if (
        intersection(partialReceiverItems, documentReceiverItems).length === partialReceiverItems.length &&
        intersection(partialSenderItems, documentSenderItems).length === partialSenderItems.length
      ) {
        throw Error('offer is a duplicate')
      }
    }
  }
}
