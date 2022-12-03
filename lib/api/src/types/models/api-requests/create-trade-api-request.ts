import { CreateTradeRequest } from '../requests/create-trade-request'
import { ApiRequestWithUserId } from './api-request-with-user-id'

export interface CreateTradeApiRequest extends ApiRequestWithUserId {
  body: CreateTradeRequest
}
