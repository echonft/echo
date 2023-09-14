import type { OfferResponse } from '@echo/api/types/responses/model/offer-response'
import { mapOfferItemFromResponse } from '@echo/ui/mappers/from-api/map-offer-item-from-response'
import type { Offer } from '@echo/ui/types/model/offer'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'
import { map, modify, pipe } from 'ramda'

export function mapOfferFromResponse(response: Partial<OfferResponse>) {
  return pipe(
    modifyNumberPropToDate<'createdAt', Partial<OfferResponse>>('createdAt'),
    modifyNumberPropToDate('expiresAt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('receiverItems', map(mapOfferItemFromResponse)),
    modify('senderItems', map(mapOfferItemFromResponse))
  )(response) as Offer
}
