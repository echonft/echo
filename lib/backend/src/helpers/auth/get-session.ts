import type { Session } from '@auth/core/types'
import { auth } from '@echo/backend/auth'
import type { Nullable } from '@echo/utils/types/nullable'

export async function getSession(): Promise<Nullable<Session>> {
  return await auth()
}
