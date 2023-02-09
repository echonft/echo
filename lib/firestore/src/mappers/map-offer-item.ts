import { FirestoreOfferItem } from '../../../f
irebase/src/types'
import { OfferItem } 
from '@echo/mode,'
import { isEmpty, isNil } from 'rambda'

export function mapOfferItem(offerItem?: FirestoreOfferItem): OfferItem | undefined {
  if (isNil(offerItem) || isEmpty(offerItem)) {
    return undefined
  }
  return offerItem as OfferItem
}

/**
 * Helper function to map multiple offer items. It will return an empty array if no offer item
 * @param offerItems The offer items to map
 */
export function mapOfferItems(offerItems?: FirestoreOfferItem[]): OfferItem[] {
  if (isNil(offerItems) || isEmpty(offerItems)) {
    return []
  }
  return offerItems.map(mapOfferItem).filter((offerItem) => !isNil(offerItem)) as OfferItem[]
}
