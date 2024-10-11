import { OfferUpdateKind } from '@echo/firestore/constants/offer/offer-update-kind'
import { getOfferStateUpdate } from '@echo/firestore/crud/offer-update/get-offer-state-update'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'

import type { OfferStateUpdateDocumentData } from '@echo/firestore/types/model/offer-update/offer-update-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { isNil } from 'ramda'

export interface AddOfferStateUpdateArgs {
  offerId: string
  args: OfferStateUpdateDocumentData['update']['args']
}

export async function addOfferStateUpdate(
  args: AddOfferStateUpdateArgs
): Promise<NewDocument<OfferStateUpdateDocumentData>> {
  const { offerId } = args
  const offer = await getOfferById(offerId)
  if (isNil(offer)) {
    return Promise.reject(
      Error(`trying to add a state update for offer with id ${offerId} but this offer does not exist`)
    )
  }
  const {
    args: { state }
  } = args
  const offerStateUpdate = await getOfferStateUpdate({ offerId, state })
  if (!isNil(offerStateUpdate)) {
    return Promise.reject(
      Error(`trying to add a state update to ${state} for offer with id ${offerId} but this update already exists`)
    )
  }
  const data: OfferStateUpdateDocumentData = {
    offerId,
    update: { kind: OfferUpdateKind.STATE, args: args.args }
  }
  const id = await setReference<OfferStateUpdateDocumentData, OfferStateUpdateDocumentData>({
    collectionReference: getOfferUpdatesCollectionReference<OfferStateUpdateDocumentData>(),
    data
  })
  return { id, data }
}
