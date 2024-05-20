import type { CancelOfferArgs } from '@echo/firestore/crud/offer/cancel-offer'
import { addOfferStateUpdate } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { OfferStateUpdateArgs } from '@echo/firestore/types/model/offer-update/offer-state-update-args'
import { OFFER_STATE_CANCELLED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import { now } from '@echo/utils/helpers/now'
import { assoc } from 'ramda'

export async function unchecked_cancelOffer(args: CancelOfferArgs): Promise<Offer> {
  const { offerId, updateArgs } = args
  const state = OFFER_STATE_CANCELLED
  const completeUpdateArgs: OfferStateUpdateArgs = assoc('state', state, updateArgs)
  const updatedOffer = await updateReference<Offer>({
    collectionReference: getOffersCollectionReference(),
    id: offerId,
    data: { state, updatedAt: now() }
  })
  await addOfferStateUpdate({ offerId, args: completeUpdateArgs })
  return updatedOffer
}
