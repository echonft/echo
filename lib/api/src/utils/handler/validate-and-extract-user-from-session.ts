import { ErrorResponse } from '../../types'
import { validateSession } from './validate-session'
import { User } from '@echo/model'
import { NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { isNil } from 'ramda'

export function validateAndExtractUserFromSession<T>(
  session: Session | undefined,
  res: NextApiResponse<T | ErrorResponse>
): User | undefined {
  const validatedRes = validateSession(session, res)
  if (isNil(validatedRes)) {
    return
  }
  const { user } = session!
  if (isNil(user)) {
    res.end(res.status(401).json({ error: 'User not found' }))
    return
  }
  return user
}
