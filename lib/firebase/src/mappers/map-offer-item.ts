import { OfferItem } from '@echo/model'
import { isEmpty, isNil } from 'rambda'
import { FirebaseOfferItem } from '../types'

export function mapOfferItem(offerItem?: FirebaseOfferItem): OfferItem | undefined {
  if (isNil(offerItem) || isEmpty(offerItem)) {
    return undefined
  }
  return offerItem as OfferItem
}

/**
 * Helper function to map multiple offer items. It will return an empty array if no offer item
 * @param offerItems The offer items to map
 */
export function mapOfferItems(offerItems?: FirebaseOfferItem[]): OfferItem[] {
  if (isNil(offerItems) || isEmpty(offerItems)) {
    return []
  }
  return offerItems.map(mapOfferItem).filter((offerItem) => !isNil(offerItem)) as OfferItem[]
}
