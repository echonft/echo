import { DeleteTradeRequest } from '../requests/delete-trade-request'
import { ApiRequestWithUserId } from './api-request-with-user-id'

export interface DeleteTradeApiRequest extends ApiRequestWithUserId {
  body: DeleteTradeRequest
}
