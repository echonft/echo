import { Offer } from '../../types/offer'
import { mapOfferItem } from './map-offer-item'
import { OfferResponse } from '@echo/api'
import { modifyStringPropToUrl } from '@echo/utils'
import { map, modify, pipe } from 'ramda'

export function mapOffer(response: Partial<OfferResponse>) {
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modifyStringPropToUrl<'createdAt', Partial<OfferResponse>>('createdAt'),
    modifyStringPropToUrl<'expiresAt', Partial<OfferResponse>>('expiresAt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('receiverItems', map(mapOfferItem)),
    modify('senderItems', map(mapOfferItem))
  )(response) as Offer
}
