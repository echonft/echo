import type { OfferResponse } from '@echo/api/types/responses/model/offer-response'
import { mapOfferItemFromResponse } from '@echo/ui/mappers/from-api/map-offer-item-from-response'
import type { Offer } from '@echo/ui/types/model/offer'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'
import { map, modify, pipe } from 'ramda'

export function mapOfferFromResponse(response: OfferResponse) {
  return pipe(
    modifyNumberPropToDate<'createdAt', OfferResponse>('createdAt'),
    modifyNumberPropToDate('expiresAt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('receiverItems', map(mapOfferItemFromResponse)),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('senderItems', map(mapOfferItemFromResponse)),
    modifyNumberPropToDate<'updatedAt', OfferResponse>('updatedAt')
  )(response) as Offer
}
