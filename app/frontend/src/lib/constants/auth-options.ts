import { FirestoreAdapter } from '@auth/firebase-adapter'
import { getDiscordAuthorizationUrl } from '@echo/discord/config/get-discord-authorization-url'
import { getDiscordConfig } from '@echo/discord/config/get-discord-config'
import { authFirestore } from '@echo/firestore/constants/auth-firestore'
import { logger } from '@echo/utils/services/logger'
import type { AuthOptions } from 'next-auth'
import Discord from 'next-auth/providers/discord'

export const authOptions: AuthOptions = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  adapter: FirestoreAdapter(authFirestore),
  providers: [
    Discord({
      clientId: getDiscordConfig().clientId,
      clientSecret: getDiscordConfig().clientSecret,
      authorization: getDiscordAuthorizationUrl()
    })
  ],
  // pages: {
  //   signIn: '/login',
  //   signOut: '/logout'
  // },
  callbacks: {
    jwt({ token, account }) {
      // if (account) {
      //   try {
      //     const user = await createOrUpdateUser(account.access_token, account.token_type, token.user)
      //     return { user, ...token }
      //   } catch (e) {
      //     logger.error(`Auth error: error creating or updating user: ${errorMessage(e)}`)
      //     return token
      //   }
      // }
      logger.info(`jwt token is ${JSON.stringify(token)}`)
      logger.info(`account is ${JSON.stringify(account)}`)
      return token
    },
    session({ session }) {
      // if (isNil(user)) {
      //   logger.error('Auth error: user is nil in session callback')
      //   return dissoc('user', session)
      // }
      logger.info(`session is ${JSON.stringify(session)}`)
      return session
      // return { ...session, user }
    }
  }
}
