import { OfferItem } from '../../types/model/offer-item'
import { NonEmptyArray } from '@echo/utils'

export const getOfferItemsCollectionId = (items: NonEmptyArray<OfferItem>) => items[0].collection.id
