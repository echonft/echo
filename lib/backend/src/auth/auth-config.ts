import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { propIsNil } from '@echo/utils/helpers/prop-is-nil'
import type { NextAuthConfig } from 'next-auth'
import { assoc, either, isNil } from 'ramda'

export const baseAuthConfig: Omit<NextAuthConfig, 'providers'> = {
  callbacks: {
    jwt: function ({ token, user }) {
      if (isNilOrEmpty(user)) {
        return token
      }
      return assoc('user', user, token)
    },
    session: function ({ session, token }) {
      if (either(isNil, propIsNil<typeof token, 'user'>('user'))(token)) {
        return session
      }
      return assoc('user', token.user, session)
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/logout'
  }
}
