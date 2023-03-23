import { RequestHandler } from '../types/handlers/request-handler'
import { NextApiRequest } from 'next'

export type methods = 'POST' | 'DELETE' | 'PUT' | 'GET'

// TODO Update with edge
/**
 * Method validation wrapper that will return a response error if method is not allowed
 * @param handler The request handler
 * @param allowedMethods The allowed methods
 */
export function withMethodValidation<T extends NextApiRequest, U>(
  handler: RequestHandler<T, U>,
  allowedMethods: methods[]
): RequestHandler<T, U> {
  return function (req, res) {
    const { method } = req
    if (allowedMethods.some((allowedMethod) => allowedMethod === method)) {
      return handler(req, res)
    }
    res.setHeader('Allow', allowedMethods)
    res.status(405).json({ error: `Method ${method ?? ''} Not Allowed` })
    return handler(req, res)
  }
}
