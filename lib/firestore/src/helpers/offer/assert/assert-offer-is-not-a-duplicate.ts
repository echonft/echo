import { getOffersCollection } from '@echo/firestore/helpers/collection/get-offers-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import type { Nft } from '@echo/model/types/nft'
import type { OfferItem } from '@echo/model/types/offer-item'
import type { User } from '@echo/model/types/user'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { intersection, isEmpty, map, modify, path, pick } from 'ramda'

interface PartialOfferItem {
  amount: number
  nft: { id: string; owner: User }
}

function mapItems(items: OfferItem[]): PartialOfferItem[] {
  return map<OfferItem, PartialOfferItem>(
    modify<'nft', Nft, Pick<Nft, 'id' | 'owner'>>('nft', pick(['id', 'owner'])),
    items
  )
}

export async function assertOfferIsNotADuplicate(
  senderItems: NonEmptyArray<OfferItem>,
  receiverItems: NonEmptyArray<OfferItem>
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
