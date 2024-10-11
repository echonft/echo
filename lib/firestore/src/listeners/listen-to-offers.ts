import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { onSnapshot } from '@echo/firestore/listeners/on-doc-changes'
import type { OfferChangeHandler } from '@echo/firestore/types/change-handler/offer-change-handler'

export function listenToOffers(onChange: OfferChangeHandler) {
  getOffersCollectionReference().onSnapshot(onSnapshot(onChange))
}
