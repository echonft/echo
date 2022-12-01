import { parseOfferItem } from './parse-offer-item'
import { OfferItem } from '@echo/model'
import { isEmpty, isNil } from 'rambda'
export function mapOfferItem(itemsString: string): OfferItem[] {
  if (isNil(itemsString) || isEmpty(itemsString)) {
    return []
  }
  return itemsString.split(',').map(parseOfferItem)
}
