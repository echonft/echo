import { getOfferSnapshotByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { addSwap } from '@echo/firestore/crud/swap/add-swap'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import type { QueryDocumentSnapshot } from '@echo/firestore/types/query-document-snapshot'
import type { Offer } from '@echo/model/types/offer'
import type { Swap } from '@echo/model/types/swap'
import { alwaysVoid } from '@echo/utils/helpers/always-void'
import type { Nullable } from '@echo/utils/types/nullable'
import type { EchoEvent } from '@echo/web3/types/echo-event'
import { always, assoc, isNil, otherwise, pick, pipe } from 'ramda'

export async function offerExecutedEventHandler({
  offerId,
  transactionHash
}: Pick<EchoEvent, 'offerId' | 'transactionHash'>) {
  const offerSnapshot = await pipe(
    getOfferSnapshotByIdContract,
    otherwise(always<Nullable<QueryDocumentSnapshot<OfferDocument>>>(undefined))
  )(offerId)
  if (!isNil(offerSnapshot)) {
    const offer = offerSnapshot.data()
    await pipe<
      [Offer],
      Omit<Swap, 'slug' | 'transactionId'>,
      Omit<Swap, 'slug'>,
      Omit<Swap, 'slug'> & Record<'offerId', string>,
      Promise<NewDocument<Swap>>,
      Promise<void>
    >(
      pick(['receiver', 'receiverItems', 'sender', 'senderItems']),
      assoc('transactionId', transactionHash),
      assoc('offerId', offerSnapshot.id),
      addSwap,
      otherwise(alwaysVoid)
    )(offer)
  }
}
