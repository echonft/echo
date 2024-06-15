import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { onSnapshot } from '@echo/firestore/listeners/on-doc-changes'
import type { ChangeHandler } from '@echo/firestore/types/change-handler'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { type Offer } from '@echo/model/types/offer'

export function listenToOffers(onChange: ChangeHandler<Offer>) {
  getOffersCollectionReference().onSnapshot(onSnapshot<Offer, OfferDocumentData>(onChange))
}
