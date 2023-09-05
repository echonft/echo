import { mapOfferItem } from './map-offer-item'
import { mapUserDetails } from './map-user-details'
import { OfferResponse } from '@echo/api'
import { Offer } from '@echo/firestore-types'
import { modifyDatePropToNumber, removeUndefinedProps } from '@echo/utils'
import { dissoc, map, modify, pipe } from 'ramda'

export function mapOffer(offer: Partial<Offer>): OfferResponse {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    removeUndefinedProps,
    dissoc('createdAt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('receiver', mapUserDetails),
    modify('sender', mapUserDetails),
    modifyDatePropToNumber('expiresAt'),
    modify('receiverItems', map(mapOfferItem)),
    modify('senderItems', map(mapOfferItem))
  )(offer) as Offer
}
