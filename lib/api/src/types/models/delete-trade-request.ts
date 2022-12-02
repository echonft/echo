import { ApiRequestWithUserId } from './api-request-with-user-id'
import { BodyWithUserId } from './body-with-user-id'

export type DeleteTradeRequestBody = {
  tradeId: string
} & BodyWithUserId

export interface DeleteTradeRequest extends ApiRequestWithUserId {
  body: DeleteTradeRequestBody
}
