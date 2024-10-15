import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import { READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { OfferState } from '@echo/model/types/offer-state'
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
  >(assoc, [always('readOnly'), pipe(prop('state'), isIn<OfferState>(READ_ONLY_OFFER_STATES)), identity])(offer)
}
