import { auth } from '@echo/backend/auth/auth'
import type { Nullable } from '@echo/utils/types/nullable'

export async function getAuthUser(): Promise<Nullable<string>> {
  const session = await auth()
  return session?.user?.username
}
