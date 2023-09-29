import type { OfferResponse } from '@echo/api/types/responses/model/offer-response'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { mapOfferItemToResponse } from '@server/mappers/to-response/map-offer-item-to-response'
import { dissoc, map, modify, pipe } from 'ramda'

export function mapOfferToResponse(offer: FirestoreOffer): OfferResponse {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    modifyDatePropToNumber<'expiresAt', FirestoreOffer>('expiresAt'),
    modifyDatePropToNumber<'createdAt', FirestoreOffer>('createdAt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('receiverItems', map(mapOfferItemToResponse)),
    modify('senderItems', map(mapOfferItemToResponse)),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dissoc('listingsIds'),
    modifyDatePropToNumber<'updatedAt', FirestoreOffer>('updatedAt')
  )(offer)
}
