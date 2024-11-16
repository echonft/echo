import { auth } from '@echo/backend/auth/auth'
import type { User } from '@echo/model/types/user'
import type { Nullable } from '@echo/utils/types/nullable'

export async function getAuthUser(): Promise<Nullable<User>> {
  const session = await auth()
  return session?.user
}
