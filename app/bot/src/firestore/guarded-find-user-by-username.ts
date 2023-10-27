import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'

export async function guardedFindUserByUsername(username: string) {
  try {
    return await findUserByUsername(username)
  } catch (e) {
    logger.error(`Error fetching user with username ${username}: ${errorMessage(e)}`)
    return undefined
  }
}
