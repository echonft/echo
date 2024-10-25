import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { info } from '@echo/backend/helpers/logger'
import { getOfferSnapshotByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { addSwap } from '@echo/firestore/crud/swap/add-swap'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import type { Offer } from '@echo/model/types/offer'
import type { Swap } from '@echo/model/types/swap'
import type { EchoEvent } from '@echo/web3/types/echo-event'
import { assoc, isNil, pick, pipe } from 'ramda'

export async function offerExecutedEventHandler(event: EchoEvent) {
  const { offerId, transactionHash } = event
  const offerSnapshot = await getOfferSnapshotByIdContract(offerId)
  if (isNil(offerSnapshot)) {
    return Promise.reject(new NotFoundError({ message: OfferError.NotFound, severity: 'warning' }))
  }
  const offer = offerSnapshot.data()
  await pipe<
    [Offer],
    Omit<Swap, 'slug' | 'transactionId'>,
    Omit<Swap, 'slug'>,
    Omit<Swap, 'slug'> & Record<'offerId', string>,
    Promise<NewDocument<Swap>>
  >(
    pick(['receiver', 'receiverItems', 'sender', 'senderItems']),
    assoc('transactionId', transactionHash),
    assoc('offerId', offerSnapshot.id),
    addSwap
  )(offer)
  info({ offer: offerSnapshot }, 'completed offer')
}
