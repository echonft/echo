import { OFFER_UPDATE_KIND_STATE } from '@echo/firestore/constants/offer/offer-update-kinds'
import type { AddOfferStateUpdateArgs } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferStateUpdate } from '@echo/firestore/types/model/offer-update/offer-state-update'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import type { NewDocument } from '@echo/firestore/types/new-document'

export async function unchecked_addOfferStateUpdate(args: AddOfferStateUpdateArgs): Promise<NewDocument<OfferUpdate>> {
  const data: OfferUpdate = {
    offerId: args.offerId,
    update: { kind: OFFER_UPDATE_KIND_STATE, args: args.args }
  }
  const id = await setReference<OfferUpdate>({
    collectionReference: getOfferUpdatesCollectionReference<OfferStateUpdate>(),
    data
  })
  return { id, data }
}
