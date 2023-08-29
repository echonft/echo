import { ServerError } from '../error/server-error'
import { ApiResponse } from '@echo/api-public'
import { NextApiRequest } from 'next'
import { AuthOptions, getServerSession } from 'next-auth'

export async function getSession<T extends NextApiRequest, U>(req: T, res: ApiResponse<U>, authOptions: AuthOptions) {
  try {
    return await getServerSession(req, res, authOptions)
  } catch (e) {
    throw new ServerError('Error retrieving session')
  }
}
