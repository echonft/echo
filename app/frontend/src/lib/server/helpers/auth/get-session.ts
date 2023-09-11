import { ServerError } from '../error/server-error'
import { AuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth/next'

export async function getSession(authOptions: AuthOptions) {
  try {
    return await getServerSession(authOptions)
  } catch (e) {
    throw new ServerError('error retrieving session', e)
  }
}
