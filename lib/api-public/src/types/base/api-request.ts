import { NextApiRequest } from 'next'

export interface ApiRequest<T, Q extends Record<string, string | string[]> = never> extends NextApiRequest {
  query: Q
  body: T
}
