import type { ChangeHandler, ChangeHandlerArgs } from '@echo/firestore/types/change-handler/change-handler'
import type { OfferUpdateDocumentData } from '@echo/firestore/types/model/offer-update/offer-update-document-data'

export type OfferUpdateChangeHandlerArgs = ChangeHandlerArgs<OfferUpdateDocumentData, OfferUpdateDocumentData>
export type OfferUpdateChangeHandler = ChangeHandler<OfferUpdateDocumentData, OfferUpdateDocumentData>
