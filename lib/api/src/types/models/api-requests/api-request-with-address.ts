import { RequestWithAddress } from '../requests/request-with-address'
import { NextApiRequest } from 'next'

export interface ApiRequestWithAddress extends NextApiRequest {
  body: object & RequestWithAddress
}
