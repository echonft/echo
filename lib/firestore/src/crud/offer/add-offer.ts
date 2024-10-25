import { addOfferArrayIndexers } from '@echo/firestore/array-indexers/offer/add-offer-array-indexers'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { OfferState } from '@echo/model/constants/offer-state'
import { nowMsSlug } from '@echo/utils/helpers/now-ms-slug'
import { assoc, isNil, pipe } from 'ramda'

export async function addOffer(
  args: Pick<OfferDocument, 'expiresAt' | 'idContract' | 'receiver' | 'receiverItems' | 'sender' | 'senderItems'>
): Promise<NewDocument<OfferDocument>> {
  const offer = await getOfferByIdContract(args.idContract)
  if (!isNil(offer)) {
    return Promise.reject(Error(OfferError.Exists))
  }
  const data = pipe<
    [
      Omit<
        OfferDocument,
        | 'locked'
        | 'slug'
        | 'state'
        | 'receiverItemCollections'
        | 'receiverItemIndexes'
        | 'senderItemCollections'
        | 'senderItemIndexes'
      >
    ],
    Omit<
      OfferDocument,
      | 'slug'
      | 'state'
      | 'receiverItemCollections'
      | 'receiverItemIndexes'
      | 'senderItemCollections'
      | 'senderItemIndexes'
    >,
    Omit<
      OfferDocument,
      'state' | 'receiverItemCollections' | 'receiverItemIndexes' | 'senderItemCollections' | 'senderItemIndexes'
    >,
    Omit<
      OfferDocument,
      'receiverItemCollections' | 'receiverItemIndexes' | 'senderItemCollections' | 'senderItemIndexes'
    >,
    OfferDocument
  >(
    assoc('locked', false),
    assoc('slug', nowMsSlug()),
    assoc('state', OfferState.Open),
    addOfferArrayIndexers
  )(args)
  const id = await setReference({
    collectionReference: offersCollection(),
    data
  })
  return { id, data }
}
