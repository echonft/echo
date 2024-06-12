import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { onSnapshot } from '@echo/firestore/listeners/on-doc-changes'
import type { ChangeHandler } from '@echo/firestore/types/change-handler'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'

export function listenToOfferUpdates(onChange: ChangeHandler<OfferUpdate>) {
  getOfferUpdatesCollectionReference().onSnapshot(onSnapshot<OfferUpdate, OfferUpdate>(onChange))
}
