import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import type { OfferState } from '@echo/model/constants/offer-state'
import { readOnlyOfferStates } from '@echo/model/constants/offer-state'
import type { Offer } from '@echo/model/types/offer/offer'
import { isIn } from '@echo/utils/fp/is-in'
import { always, assoc, converge, identity, pipe, prop } from 'ramda'

export function setReadOnly(offer: OfferDocumentData): Offer {
  return converge<
    Offer,
    [
      (model: OfferDocumentData) => string,
      (model: OfferDocumentData) => boolean,
      (model: OfferDocumentData) => OfferDocumentData
    ]
  >(assoc, [always('readOnly'), pipe(prop('state'), isIn<OfferState>(readOnlyOfferStates)), identity])(offer)
}
