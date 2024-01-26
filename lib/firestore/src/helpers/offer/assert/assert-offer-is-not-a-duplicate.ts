import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { NOT_READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import { type Nft } from '@echo/model/types/nft'
import { type OfferItem } from '@echo/model/types/offer-item'
import { type User } from '@echo/model/types/user'
import { stringComparator } from '@echo/utils/comparators/string-comparator'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { now } from '@echo/utils/helpers/now'
import { intersection, isEmpty, map, modify, path, pick, pipe, sort } from 'ramda'

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

export async function assertOfferIsNotADuplicate(senderItems: OfferItem[], receiverItems: OfferItem[]) {
  const receiverItemsNftIds = pipe(
    map<OfferItem, string>(nonNullableReturn(path(['nft', 'id']))),
    sort(stringComparator)
  )(receiverItems)
  const senderItemsNftIds = pipe(
    map<OfferItem, string>(nonNullableReturn(path(['nft', 'id']))),
    sort(stringComparator)
  )(senderItems)
  const documents = await pipe(
    getOffersCollectionReference,
    queryWhere('state', 'in', NOT_READ_ONLY_OFFER_STATES),
    queryWhere('expiresAt', '>', now()),
    queryWhere('receiverItemsNftIds', '==', receiverItemsNftIds),
    queryWhere('senderItemsNftIds', '==', senderItemsNftIds),
    getQueryData
  )()
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
