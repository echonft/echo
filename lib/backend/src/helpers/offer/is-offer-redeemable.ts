import { getEscrowedNftSnapshot } from '@echo/firestore/crud/nft/get-escrowed-nft-snapshot'
import { getNftSnapshotByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import type { EscrowedNftDocument } from '@echo/firestore/types/model/escrowed-nft-document'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import { OfferState } from '@echo/model/constants/offer-state'
import { itemToken } from '@echo/model/helpers/item/item-token'
import { offerReceiverNftItems } from '@echo/model/helpers/offer/offer-receiver-nft-items'
import { offerSenderNftItems } from '@echo/model/helpers/offer/offer-sender-nft-items'
import type { NftItem } from '@echo/model/types/item'
import type { Offer } from '@echo/model/types/offer'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, andThen, ifElse, isNil, otherwise, pathEq, pipe, prop } from 'ramda'

export function isOfferRedeemable(username: string) {
  return async function (offer: Offer): Promise<boolean> {
    const { state } = offer
    if (state === OfferState.Cancelled || state === OfferState.Rejected || state === OfferState.Expired) {
      const nftItems = ifElse<[Offer], NftItem[], NftItem[]>(
        pathEq(username, ['sender', 'username']),
        offerSenderNftItems,
        ifElse(pathEq(username, ['receiver', 'username']), offerReceiverNftItems, always<NftItem[]>([]))
      )(offer)
      for (const item of nftItems) {
        const escrowedNftSnapshot = await pipe(
          itemToken,
          getNftSnapshotByIndex,
          andThen(
            unlessNil(
              pipe(
                prop('id'),
                getEscrowedNftSnapshot,
                otherwise(always<Nullable<QueryDocumentSnapshot<EscrowedNftDocument>>>(undefined))
              )
            )
          ),
          otherwise(always<Nullable<QueryDocumentSnapshot<EscrowedNftDocument>>>(undefined))
        )(item)
        if (!isNil(escrowedNftSnapshot)) {
          return true
        }
      }
      return false
    }
    return false
  }
}
