import { UpdateTradeRequest } from '../requests/update-trade-request'
import { ApiRequestWithUserId } from './api-request-with-user-id'

export interface UpdateTradeApiRequest extends ApiRequestWithUserId {
  body: UpdateTradeRequest
}
