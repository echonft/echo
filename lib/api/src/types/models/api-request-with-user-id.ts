import { BodyWithUserId } from './body-with-user-id'
import { NextApiRequest } from 'next'

export interface ApiRequestWithUserId extends NextApiRequest {
  body: Record<string, unknown> & BodyWithUserId
}
