import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { updateOfferState, type UpdateOfferStateArgs } from '@echo/firestore/crud/offer/update-offer-state'
import { addSwap } from '@echo/firestore/crud/swap/add-swap'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { OfferState } from '@echo/model/constants/offer-state'
import { type Offer } from '@echo/model/types/offer/offer'
import { assoc, isNil, omit, pipe } from 'ramda'

export interface CompleteOfferArgs extends Omit<UpdateOfferStateArgs, 'state'> {
  transactionId: string
}

export async function completeOffer(args: CompleteOfferArgs): Promise<Offer> {
  const snapshot = await getOfferSnapshot(args.slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(OfferError.NotFound))
  }
  const offer = await pipe<
    [CompleteOfferArgs],
    Omit<CompleteOfferArgs, 'transactionId'>,
    UpdateOfferStateArgs,
    Promise<Offer>
  >(
    omit(['transactionId']),
    assoc<OfferState, 'state'>('state', OfferState.Completed),
    updateOfferState
  )(args)
  // add swap
  await pipe<
    [CompleteOfferArgs],
    Omit<CompleteOfferArgs, 'reason'>,
    SwapDocumentData,
    Promise<NewDocument<SwapDocumentData>>
  >(
    omit(['reason']),
    assoc('offerId', snapshot.id),
    addSwap
  )(args)
  return offer
}
