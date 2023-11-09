import { OFFER_UPDATE_KIND_STATE } from '@echo/firestore/constants/offer/offer-update-kinds'
import type { AddOfferStateUpdateArgs } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import type { OfferStateUpdate } from '@echo/firestore/types/model/offer-update/offer-state-update'
import { now } from '@echo/utils/helpers/now'

export async function unchecked_addOfferStateUpdate(args: AddOfferStateUpdateArgs) {
  const reference = getOfferUpdatesCollectionReference().doc()
  const newOfferStateUpdate: OfferStateUpdate = {
    id: reference.id,
    offerId: args.offerId,
    update: { kind: OFFER_UPDATE_KIND_STATE, args: args.args },
    createdAt: now()
  }
  await reference.set(newOfferStateUpdate)
  return newOfferStateUpdate
}
