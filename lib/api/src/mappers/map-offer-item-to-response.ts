import { OfferItemResponse } from '../types/model/responses/offer-item-response'
import { OfferItem } from '@echo/model'
import { call, invoker, modify } from 'ramda'

// TODO Tests
export function mapOfferItemToResponse(offerItem: OfferItem): OfferItemResponse {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return modify('tokenId', call(invoker(0, 'toString')), offerItem)
}
