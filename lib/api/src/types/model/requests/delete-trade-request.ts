import { RequestWithUserId } from '../requests/request-with-user-id'

export interface DeleteTradeRequest extends RequestWithUserId {
  tradeId: string
}
