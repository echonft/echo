import { authConfig } from '@echo/frontend/lib/helpers/auth/auth-config'
import NextAuth from 'next-auth'

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  // adapter: FirestoreAdapter({ firestore: initializeFirebase() }),
  // debug: true,
  session: { strategy: 'jwt' },
  // cookies: {
  //   sessionToken: {}
  // },
  ...authConfig
})
