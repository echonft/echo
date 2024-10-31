import { getSession } from '@echo/backend/helpers/auth/get-session'
import type { User } from '@echo/model/types/user'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export async function getAuthUser(): Promise<Nullable<User>> {
  const session = await getSession()
  if (isNil(session) || isNilOrEmpty(session.user)) {
    return null
  }
  return session.user
}
