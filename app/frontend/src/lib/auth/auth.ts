import { authConfig } from '@echo/frontend/lib/auth/auth-config'
import NextAuth from 'next-auth'

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  session: { strategy: 'jwt' },
  ...authConfig
})
