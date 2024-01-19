import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import {
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_EXPIRED,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import { dateNumberIsPast } from '@echo/utils/helpers/date-number-is-past'
import { always, anyPass, assoc, converge, equals, identity, pipe, prop, when } from 'ramda'

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
    >(assoc, [
      always('readOnly'),
      pipe(
        prop('state'),
        anyPass([
          equals(OFFER_STATE_EXPIRED),
          equals(OFFER_STATE_REJECTED),
          equals(OFFER_STATE_COMPLETED),
          equals(OFFER_STATE_CANCELLED)
        ])
      ),
      identity
    ])
  )(offer)
}
