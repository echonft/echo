import { RequestWithUserId } from '../requests/request-with-user-id'
import { OfferItem, OfferType } from '@echo/model'

export interface CreateOfferRequest extends RequestWithUserId {
  type: OfferType
  collectionId: string
  ownerItems: OfferItem[]
  counterpartyItems: OfferItem[] | undefined
}
