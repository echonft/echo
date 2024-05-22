import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { addOfferStateUpdate } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { assertOfferStateUpdateArgs } from '@echo/firestore/helpers/offer/assert/assert-offer-state-update-args'
import type { OfferStateUpdateArgs } from '@echo/firestore/types/model/offer-update/offer-state-update-args'
import { assertOfferStateTransition } from '@echo/model/helpers/offer/assert/assert-offer-state-transition'
import type { Offer } from '@echo/model/types/offer'
import { type OfferState } from '@echo/model/types/offer-state'
import { now } from '@echo/utils/helpers/now'
import { assoc, isNil } from 'ramda'

export interface UpdateOfferStateArgs {
  slug: string
  state: OfferState
  updateArgs: Omit<OfferStateUpdateArgs, 'state'>
}

export async function updateOfferState(args: UpdateOfferStateArgs): Promise<Offer> {
  const { slug, state, updateArgs } = args
  const snapshot = await getOfferSnapshot(slug)
  if (isNil(snapshot)) {
    throw Error(`offer with slug ${slug} does not exist`)
  }
  const offer = snapshot.data()
  assertOfferStateTransition(offer, state)
  const completeUpdateArgs: OfferStateUpdateArgs = assoc('state', state, updateArgs)
  assertOfferStateUpdateArgs(snapshot.id, offer, completeUpdateArgs)
  const updatedOffer = await updateReference<Offer>({
    collectionReference: getOffersCollectionReference(),
    id: snapshot.id,
    data: { state, updatedAt: now() }
  })
  await addOfferStateUpdate({ offerId: snapshot.id, args: completeUpdateArgs })
  return updatedOffer
}
