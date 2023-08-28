import { MethodNotAllowedError } from './method-not-allowed-error'
import { NextApiRequest } from 'next'
import { HTTP_METHOD } from 'next/dist/server/web/http'
import { includes } from 'ramda'

export function assertAllowedMethods<T extends NextApiRequest>(req: T, allowedMethods: HTTP_METHOD[]) {
  const { method } = req
  if (!includes(method, allowedMethods)) {
    throw new MethodNotAllowedError(allowedMethods)
  }
}
