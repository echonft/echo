import { RequestWithUserId } from '../requests/request-with-user-id'
import { NextApiRequest } from 'next'

export interface ApiRequestWithUserId extends NextApiRequest {
  body: unknown & RequestWithUserId
}
