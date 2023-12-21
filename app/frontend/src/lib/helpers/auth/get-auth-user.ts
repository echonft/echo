import { getAuthOptions } from '@echo/frontend/lib/helpers/auth/get-auth-options'
import { getServerSession } from 'next-auth/next'

export async function getAuthUser() {
  const authOptions = getAuthOptions()
  const session = await getServerSession(authOptions)
  return session?.user
}
