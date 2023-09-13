import type { OfferResponse } from '@echo/api/types/responses/model/offer-response'
import { mapOfferItem } from '@echo/ui/mappers/from-api/map-offer-item'
import type { Offer } from '@echo/ui/types/model/offer'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'
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
