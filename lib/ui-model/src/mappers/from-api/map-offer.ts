import { Offer } from '../../types/offer'
import { mapOfferItem } from './map-offer-item'
import { mapUser } from './map-user'
import { OfferResponse } from '@echo/api'
import { map, modify, pipe } from 'ramda'

export function mapOffer(response: OfferResponse) {
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('receiver', mapUser),
    modify('receiverItems', map(mapOfferItem)),
    modify('sender', mapUser),
    modify('senderItems', map(mapOfferItem))
  )(response) as Offer
}
