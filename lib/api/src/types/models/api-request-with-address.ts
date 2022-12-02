import { BodyWithAddress } from './body-with-address'
import { NextApiRequest } from 'next'

export interface ApiRequestWithAddress extends NextApiRequest {
  body: Record<string, unknown> & BodyWithAddress
}
