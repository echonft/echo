import { NextApiRequest } from 'next'
export interface ApiLoginRequest extends NextApiRequest {
  body: {
    message: string
    signature: string
    address: string
    discordId: string
  }
}
