import { UpdateListingAction } from '../../constants/update-listing-action'
import { IdRequest } from './id-request'

export interface UpdateListingRequest extends IdRequest {
  action: UpdateListingAction
}
