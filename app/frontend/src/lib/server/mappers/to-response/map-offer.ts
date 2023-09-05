import { mapOfferItem } from './map-offer-item'
import { OfferResponse } from '@echo/api'
import { Offer } from '@echo/firestore-types'
import { modifyDatePropToNumber } from '@echo/utils'
import { dissoc, map, modify, pipe } from 'ramda'

export function mapOffer(offer: Partial<Offer>): Partial<OfferResponse> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    modifyDatePropToNumber<'expiresAt', Partial<Offer>>('expiresAt'),
    modifyDatePropToNumber<'createdAt', Partial<Offer>>('createdAt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('receiverItems', map(mapOfferItem)),
    modify('senderItems', map(mapOfferItem)),
    dissoc('discordGuild')
  )(offer)
}
