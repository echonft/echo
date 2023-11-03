import { setUserId } from '@echo/firestore/crud/user/set-user-id'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'

export async function guarded_setUserId(username: string) {
  try {
    return await setUserId(username)
  } catch (e) {
    throw new ServerError(`error setting id for user with username ${username}`, e)
  }
}
