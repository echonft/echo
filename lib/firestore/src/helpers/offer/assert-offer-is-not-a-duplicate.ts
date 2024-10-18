import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { notReadOnlyOfferStates } from '@echo/model/constants/offer-state'
import { eqOwnedNfts } from '@echo/model/helpers/nft/eq-owned-nfts'
import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
import { getOfferReceiverItemsCollectionSlugs } from '@echo/model/helpers/offer/get-offer-receiver-items-collection-slugs'
import { getOfferSenderItemsCollectionSlugs } from '@echo/model/helpers/offer/get-offer-sender-items-collection-slugs'

import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { Offer } from '@echo/model/types/offer/offer'
import { eqList } from '@echo/utils/fp/eq-list'
import { now } from '@echo/utils/helpers/now'
import { andThen, both, filter, type NonEmptyArray, pipe } from 'ramda'

export async function assertOfferIsNotADuplicate(args: {
  receiverItems: NonEmptyArray<OwnedNft>
  senderItems: NonEmptyArray<OwnedNft>
}) {
  const { receiverItems, senderItems } = args
  const potentialDuplicates = await pipe(
    getOffersCollectionReference,
    queryWhere('state', 'in', notReadOnlyOfferStates),
    queryWhere('expiresAt', '>', now()),
    getQueryData,
    andThen(
      filter<Offer>(
        both(
          pipe(getOfferReceiverItemsCollectionSlugs, eqList(getNftsCollectionSlugs(receiverItems))),
          pipe(getOfferSenderItemsCollectionSlugs, eqList(getNftsCollectionSlugs(senderItems)))
        )
      )
    )
  )()
  // compare the items with each potential duplicate
  for (const potentialDuplicate of potentialDuplicates) {
    if (
      eqOwnedNfts(receiverItems, potentialDuplicate.receiverItems) &&
      eqOwnedNfts(senderItems, potentialDuplicate.senderItems)
    ) {
      return Promise.reject(Error('offer is a duplicate'))
    }
  }
}
