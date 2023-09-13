import type { OfferResponse } from '@echo/api/types/responses/model/offer-response'
import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { mapOfferItem } from '@server/mappers/to-response/map-offer-item'
import { dissoc, map, modify, pipe } from 'ramda'

export function mapOffer(offer: Partial<FirestoreOffer>): Partial<OfferResponse> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    modifyDatePropToNumber<'expiresAt', Partial<FirestoreOffer>>('expiresAt'),
    modifyDatePropToNumber<'createdAt', Partial<FirestoreOffer>>('createdAt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('receiverItems', map(mapOfferItem)),
    modify('senderItems', map(mapOfferItem)),
    dissoc('listingsIds'),
    dissoc('discordGuild')
  )(offer)
}
