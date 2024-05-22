import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { compareItems } from '@echo/firestore/helpers/item/compare-items'
import { NOT_READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
import type { Nft } from '@echo/model/types/nft'
import { contentEq } from '@echo/utils/fp/content-eq'
import { now } from '@echo/utils/helpers/now'
import { filter, pipe, prop } from 'ramda'

export async function assertOfferIsNotADuplicate(senderItems: Nft[], receiverItems: Nft[]) {
  const potentialDuplicates = await pipe(
    getOffersCollectionReference,
    queryWhere('state', 'in', NOT_READ_ONLY_OFFER_STATES),
    queryWhere('expiresAt', '>', now()),
    getQueryData,
    filter(pipe(prop('receiverItemCollections'), contentEq(getNftsCollectionSlugs(receiverItems)))),
    filter(pipe(prop('senderItemCollections'), contentEq(getNftsCollectionSlugs(senderItems))))
  )()
  // compare the items with each potential duplicate
  for (const potentialDuplicate of potentialDuplicates) {
    if (
      compareItems(receiverItems, potentialDuplicate.receiverItems) &&
      compareItems(senderItems, potentialDuplicate.senderItems)
    ) {
      throw Error('offer is a duplicate')
    }
  }
}
