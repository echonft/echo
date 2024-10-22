import { NotFoundError } from '@echo/backend/errors/not-found-error'
import type { EchoEventHandlerArgs } from '@echo/backend/request-handlers/webhook/event-handlers/echo-event-handler'
import { getOfferSnapshotByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { addSwap } from '@echo/firestore/crud/swap/add-swap'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import type { Offer } from '@echo/model/types/offer/offer'
import type { Swap } from '@echo/model/types/swap/swap'
import { assoc, isNil, pick, pipe } from 'ramda'

export async function offerExecutedEventHandler(args: EchoEventHandlerArgs) {
  const { logger, event } = args
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
  logger?.info({ offer: offerSnapshot }, 'completed offer')
}
