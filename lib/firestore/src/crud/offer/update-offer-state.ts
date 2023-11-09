import { getOfferSnapshotById } from '@echo/firestore/crud/offer/get-offer-snapshot-by-id'
import { addOfferStateUpdate } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { assertQueryDocumentSnapshot } from '@echo/firestore/helpers/crud/assert/assert-query-document-snapshot'
import { assertOfferStateUpdateArgs } from '@echo/firestore/helpers/offer/assert/assert-offer-state-update-args'
import type { OfferStateUpdateArgs } from '@echo/firestore/types/model/offer-update/offer-state-update-args'
import { assertOfferState } from '@echo/model/helpers/offer/assert/assert-offer-state'
import type { Offer } from '@echo/model/types/offer'
import { type OfferState } from '@echo/model/types/offer-state'
import { now } from '@echo/utils/helpers/now'
import { assoc, mergeLeft } from 'ramda'

export async function updateOfferState(args: {
  offerId: string
  state: OfferState
  updateArgs: Omit<OfferStateUpdateArgs, 'state'>
}) {
  const { offerId, state, updateArgs } = args
  const documentSnapshot = await getOfferSnapshotById(offerId)
  assertQueryDocumentSnapshot(documentSnapshot)
  const offer = documentSnapshot.data()
  assertOfferState(offer, state)
  const completeUpdateArgs: OfferStateUpdateArgs = assoc('state', state, updateArgs)
  assertOfferStateUpdateArgs(offer, completeUpdateArgs)
  const updateData = { state, updatedAt: now() }
  await documentSnapshot.ref.update(updateData)
  await addOfferStateUpdate({ offerId, args: completeUpdateArgs })
  return mergeLeft(updateData, offer) as Offer
}
