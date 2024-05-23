import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { NOT_READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import { eqNfts } from '@echo/model/helpers/nft/eq-nfts'
import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
import type { Nft } from '@echo/model/types/nft'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
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
          pipe(prop('receiverItems'), getNftsCollectionSlugs, eqListContent(getNftsCollectionSlugs(receiverItems))),
          pipe(prop('senderItems'), getNftsCollectionSlugs, eqListContent(getNftsCollectionSlugs(senderItems)))
        )
      )
    )
  )()
  // compare the items with each potential duplicate
  for (const potentialDuplicate of potentialDuplicates) {
    if (
      eqNfts(receiverItems, potentialDuplicate.receiverItems, true) &&
      eqNfts(senderItems, potentialDuplicate.senderItems, true)
    ) {
      throw Error('offer is a duplicate')
    }
  }
}
