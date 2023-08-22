import { ApiError } from '../api-error'
import { getUserFromSession } from '../auth/get-user-from-session'
import { Session } from 'next-auth'

export const assertUserIs = (userId: string, session: Session | undefined) => {
  const user = getUserFromSession(session)
  if (user.id !== userId) {
    throw new ApiError(403, 'Forbidden')
  }
  return user
}
