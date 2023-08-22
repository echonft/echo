import { NextApiRequest } from 'next'

export interface ApiRequest<T, Q extends Partial<{ [key: string]: string | string[] }>> extends NextApiRequest {
  query: Q
  body: T
}
