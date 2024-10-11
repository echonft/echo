import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { onSnapshot } from '@echo/firestore/listeners/on-doc-changes'
import type { OfferUpdateChangeHandler } from '@echo/firestore/types/change-handler/offer-update-change-handler'

export function listenToOfferUpdates(onChange: OfferUpdateChangeHandler) {
  getOfferUpdatesCollectionReference().onSnapshot(onSnapshot(onChange))
}
