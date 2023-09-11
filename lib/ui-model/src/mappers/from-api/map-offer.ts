import { Offer } from '../../types/offer'
import { mapOfferItem } from './map-offer-item'
import type { OfferResponse } from '@echo/api/types'
import { modifyNumberPropToDate } from '@echo/utils'
import { map, modify, pipe } from 'ramda'

export function mapOffer(response: Partial<OfferResponse>) {
  return pipe(
    modifyNumberPropToDate<'createdAt', Partial<OfferResponse>>('createdAt'),
    modifyNumberPropToDate('expiresAt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('receiverItems', map(mapOfferItem)),
    modify('senderItems', map(mapOfferItem))
  )(response) as Offer
}
