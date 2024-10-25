import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { onSnapshot } from '@echo/firestore/listeners/on-doc-changes'
import type { OfferChangeHandler } from '@echo/firestore/types/change-handler/offer-change-handler'

export function listenToOffers(onChange: OfferChangeHandler) {
  offersCollection().onSnapshot(onSnapshot(onChange))
}
