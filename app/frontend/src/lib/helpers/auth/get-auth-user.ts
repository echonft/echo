import { auth } from '@echo/frontend/lib/helpers/auth/auth'

export async function getAuthUser() {
  const session = await auth()
  return session?.user
}
