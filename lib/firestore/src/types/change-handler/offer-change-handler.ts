import type { ChangeHandler, ChangeHandlerArgs } from '@echo/firestore/types/change-handler/change-handler'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'

export type OfferChangeHandlerArgs = ChangeHandlerArgs<OfferDocument>
export type OfferChangeHandler = ChangeHandler<OfferDocument>
