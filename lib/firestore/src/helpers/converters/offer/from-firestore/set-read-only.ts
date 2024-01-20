import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { OFFER_STATE_EXPIRED, READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { OfferState } from '@echo/model/types/offer-state'
import { isIn } from '@echo/utils/fp/is-in'
import { dateNumberIsPast } from '@echo/utils/helpers/date-number-is-past'
import { always, assoc, converge, identity, pipe, prop, when } from 'ramda'

export function setReadOnly(offer: OfferDocumentData): Offer {
  return pipe(
    when<OfferDocumentData, OfferDocumentData>(
      pipe(prop('expiresAt'), dateNumberIsPast),
      assoc('state', OFFER_STATE_EXPIRED)
    ),
    converge<
      Offer,
      [
        (model: OfferDocumentData) => string,
        (model: OfferDocumentData) => boolean,
        (model: OfferDocumentData) => OfferDocumentData
      ]
    >(assoc, [always('readOnly'), pipe(prop('state'), isIn<OfferState>(READ_ONLY_OFFER_STATES)), identity])
  )(offer)
}
