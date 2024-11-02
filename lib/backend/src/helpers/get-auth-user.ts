import { auth } from '@echo/backend/auth'
import type { Username } from '@echo/model/types/username'
import type { Nullable } from '@echo/utils/types/nullable'

export async function getAuthUser(): Promise<Nullable<Username>> {
  const session = await auth()
  return session?.user?.username
}
