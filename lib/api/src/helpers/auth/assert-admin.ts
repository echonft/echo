import { UnauthorizedError } from '../error/unauthorized-error'
import { getAdminApiKey } from './get-admin-api-key'
import { NextApiRequest } from 'next'
import { isNil } from 'ramda'

export const assertAdmin = <T extends NextApiRequest>(req: T) => {
  if (isNil(req.headers.authorization) || req.headers.authorization !== `Bearer ${getAdminApiKey()}`) {
    throw new UnauthorizedError()
  }
}
