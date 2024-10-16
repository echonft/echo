import type { ChangeHandler, ChangeHandlerArgs } from '@echo/firestore/types/change-handler/change-handler'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import type { Offer } from '@echo/model/types/offer/offer'

export type OfferChangeHandlerArgs = ChangeHandlerArgs<Offer, OfferDocumentData>
export type OfferChangeHandler = ChangeHandler<Offer, OfferDocumentData>
