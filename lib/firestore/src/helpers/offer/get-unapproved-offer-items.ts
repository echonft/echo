import { OfferItem } from '../../types/model/offer-item'
import { prop, reject } from 'ramda'

export function getUnapprovedOfferItems(items: OfferItem[]) {
  return reject(prop<boolean>('approved'))(items)
}
