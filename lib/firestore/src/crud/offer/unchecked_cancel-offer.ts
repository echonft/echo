import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import type { UpdateOfferStateArgs } from '@echo/firestore/crud/offer/update-offer-state'
import { addOfferStateUpdate } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { OfferStateUpdateArgs } from '@echo/firestore/types/model/offer-update/offer-state-update-args'
import { OFFER_STATE_CANCELLED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import { now } from '@echo/utils/helpers/now'
import { assoc, isNil } from 'ramda'

export async function unchecked_cancelOffer(args: Omit<UpdateOfferStateArgs, 'state'>): Promise<Offer> {
  const { slug, updateArgs } = args
  const snapshot = await getOfferSnapshot(slug)
  if (isNil(snapshot)) {
    throw Error(`offer with slug ${slug} does not exist`)
  }
  const state = OFFER_STATE_CANCELLED
  const completeUpdateArgs: OfferStateUpdateArgs = assoc('state', state, updateArgs)
  const updatedOffer = await updateReference<Offer>({
    collectionReference: getOffersCollectionReference(),
    id: snapshot.id,
    data: { state, updatedAt: now() }
  })
  await addOfferStateUpdate({ offerId: snapshot.id, args: completeUpdateArgs })
  return updatedOffer
}
