import { UpdateOfferAction } from '../../../../api/src/types/helper/update-offer-action'
import { IdRequest } from './id-request'

export interface UpdateOfferRequest extends IdRequest {
  action: UpdateOfferAction
}
