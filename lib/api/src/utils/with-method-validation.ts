import { RequestHandler } from './request-handler'
import { NextApiRequest } from 'next'

export type methods = 'POST' | 'DELETE' | 'PUT' | 'GET'

/**
 * Method validation wrapper that will return a response error if method is not allowed
 * @param handler The request handler
 * @param allowedMethods The allowed methods
 */
export function withMethodValidation<T extends NextApiRequest, U>(
  handler: RequestHandler<T, U>,
  allowedMethods: methods[]
): RequestHandler<T, U> {
  return function withValidation(req, res) {
    const { method } = req
    if (allowedMethods.some((allowedMethod) => allowedMethod === method)) {
      return handler(req, res)
    } else {
      res.setHeader('Allow', allowedMethods)
      return res.status(405).json({ error: `Method ${method ?? ''} Not Allowed` })
    }
  }
}
