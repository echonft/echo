import { NextApiRequest } from 'next'

interface LoginRequest {
  message: string
  signature: string
  address: string
  discordId: string
}

export interface ApiLoginRequest extends NextApiRequest {
  body: LoginRequest
}
