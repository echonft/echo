import { createOrUpdateUser } from '../utils/auth/create-or-update-user'
import { R } from '@mobily/ts-belt'
import { CallbacksOptions } from 'next-auth/core/types'
import { isNil } from 'ramda'

export const authCallbackOptions: Partial<CallbacksOptions> = {
  async jwt({ token, account }) {
    // No firebase token means user is not logged in firebase
    if (account) {
      // TODO Add claims (roles)
      return createOrUpdateUser(account.access_token, account.token_type, token.sub).then((userResult) => {
        if (R.isError(userResult)) {
          throw Error('Auth error: error creating or updating user')
        }
        return { ...token, user: R.getExn(userResult) }
      })
    }
    return token
  },
  session({ session, token: { user } }) {
    // Should never happen, only for type guarding
    if (isNil(user)) {
      throw Error('Auth error: invalid token data')
    }
    // Inject user in session
    return { ...session, user }
  }
}
