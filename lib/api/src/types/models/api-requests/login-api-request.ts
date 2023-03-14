import { LoginRequest } from '../requests/login-request'
import { NextApiRequest } from 'next'
export interface LoginApiRequest extends NextApiRequest {
  body: LoginRequest
}
