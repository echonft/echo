import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { itemsEq } from '@echo/firestore/helpers/item/items-eq'
import { NOT_READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
import type { Nft } from '@echo/model/types/nft'
import { contentEq } from '@echo/utils/fp/content-eq'
import { now } from '@echo/utils/helpers/now'
import { andThen, both, filter, pipe, prop } from 'ramda'

export async function assertOfferIsNotADuplicate(args: { receiverItems: Nft[]; senderItems: Nft[] }) {
  const { receiverItems, senderItems } = args
  const potentialDuplicates = await pipe(
    getOffersCollectionReference,
    queryWhere('state', 'in', NOT_READ_ONLY_OFFER_STATES),
    queryWhere('expiresAt', '>', now()),
    getQueryData,
    andThen(
      filter(
        both(
          pipe(prop('receiverItems'), getNftsCollectionSlugs, contentEq(getNftsCollectionSlugs(receiverItems))),
          pipe(prop('senderItems'), getNftsCollectionSlugs, contentEq(getNftsCollectionSlugs(senderItems)))
        )
      )
    )
  )()
  // compare the items with each potential duplicate
  for (const potentialDuplicate of potentialDuplicates) {
    if (
      itemsEq(receiverItems, potentialDuplicate.receiverItems) &&
      itemsEq(senderItems, potentialDuplicate.senderItems)
    ) {
      throw Error('offer is a duplicate')
    }
  }
}
