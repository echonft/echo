import { OfferItemRequest } from '@echo/api/types/requests/offer-item-request'
import { OfferItem } from '@echo/ui/types/model/offer-item'
import { map, modify, pick } from 'ramda'

export function mapOfferItemsToRequests(items: OfferItem[]) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return map(modify('nft', pick(['id'])), items) as OfferItemRequest[]
}
