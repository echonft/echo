import { RequestHandler } from '../types/handlers/request-handler'
import { NextApiRequest } from 'next'
import { HTTP_METHOD } from 'next/dist/server/web/http'

/**
 * Method validation wrapper that will return a response error if method is not allowed
 * @param handler The request handler
 * @param allowedMethods The allowed methods
 */
export function withMethodValidation<T extends NextApiRequest, U>(
  handler: RequestHandler<T, U>,
  allowedMethods: HTTP_METHOD[]
): RequestHandler<T, U> {
  return function (req, res) {
    const { method } = req
    if (allowedMethods.some((allowedMethod) => allowedMethod === method)) {
      return handler(req, res)
    }
    res.setHeader('Allow', allowedMethods)
    res.end(res.status(405).json({ error: `Method ${method ?? ''} Not Allowed` }))
    throw Error(`Method ${method ?? ''} Not Allowed`)
  }
}
