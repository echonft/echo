import { NextApiRequest } from 'next'

export interface NonceRequest extends NextApiRequest {
  body: {
    address: string
  }
}
