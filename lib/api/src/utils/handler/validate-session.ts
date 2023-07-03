import { ErrorResponse } from '../../types'
import { NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { isNil } from 'ramda'

export function validateSession<T>(
  session: Session | undefined,
  res: NextApiResponse<T | ErrorResponse>
): NextApiResponse<T | ErrorResponse> | undefined {
  if (isNil(session)) {
    res.end(res.status(401).json({ error: 'You must be logged in' }))
    return
  }
  return res
}
