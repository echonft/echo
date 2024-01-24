import { OFFER_UPDATE_KIND_STATE } from '@echo/firestore/constants/offer/offer-update-kinds'
import type { AddOfferStateUpdateArgs } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { setReferenceWithId } from '@echo/firestore/helpers/crud/reference/set-reference-with-id'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import { now } from '@echo/utils/helpers/now'
import { pipe } from 'ramda'

export function unchecked_addOfferStateUpdate(args: AddOfferStateUpdateArgs): Promise<OfferUpdate> {
  return pipe(
    getOfferUpdatesCollectionReference,
    setReferenceWithId({
      offerId: args.offerId,
      update: { kind: OFFER_UPDATE_KIND_STATE, args: args.args },
      createdAt: now()
    })
  )()
}
