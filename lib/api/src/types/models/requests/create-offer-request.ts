import { RequestWithUserId } from '../requests/request-with-user-id'
import { OfferItem } from '@echo/model'

// TODO review with new model
export interface CreateOfferRequest extends RequestWithUserId {
  type: unknown
  collectionId: string
  ownerItems: OfferItem[]
  counterpartyItems: OfferItem[] | undefined
}
