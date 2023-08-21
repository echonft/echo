import { UpdateOfferAction } from '../../constants/update-offer-action'
import { IdRequest } from './id-request'

export interface UpdateOfferRequest extends IdRequest {
  action: UpdateOfferAction
}
