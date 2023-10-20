import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import { getOfferItemsCollectionIds } from '@echo/model/helpers/offer/get-offer-items-collection-ids'
import { type Offer } from '@echo/model/types/offer'
import { pipe, uniq } from 'ramda'

export function getOfferCollectionIds(offer: Offer): string[] {
  return pipe(getOfferItems, getOfferItemsCollectionIds, uniq<string>)(offer)
}
