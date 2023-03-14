import { NonceRequest } from '../requests/nonce-request'
import { NextApiRequest } from 'next'

export interface NonceApiRequest extends NextApiRequest {
  body: NonceRequest
}
