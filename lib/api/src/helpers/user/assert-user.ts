import { ApiError } from '../api-error'
import { getUserFromSession } from '../handler/get-user-from-session'
import { Session } from 'next-auth'

export const assertUser = (userId: string, session: Session | undefined) => {
  const user = getUserFromSession(session)
  if (user.id !== userId) {
    throw new ApiError(401, 'Forbidden')
  }
}
