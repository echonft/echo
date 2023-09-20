import { FirestoreAdapter } from '@auth/firebase-adapter'
import { getDiscordAuthorizationUrl } from '@echo/discord/config/get-discord-authorization-url'
import { getDiscordConfig } from '@echo/discord/config/get-discord-config'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { getSessionToken } from '@server/helpers/auth/get-session-token'
import { setUserIdIfNeeded } from '@server/helpers/user/set-user-id-if-needed'
import { updateDiscordUserIfNeeded } from '@server/helpers/user/update-discord-user-if-needed'
import { updateUserNftsIfNeeded } from '@server/helpers/user/update-user-nfts-if-needed'
import type { AuthOptions } from 'next-auth'
import Discord from 'next-auth/providers/discord'
import { isNil, omit } from 'ramda'

export const authOptions: AuthOptions = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  adapter: FirestoreAdapter(initializeFirebase()),
  providers: [
    Discord({
      clientId: getDiscordConfig().clientId,
      clientSecret: getDiscordConfig().clientSecret,
      authorization: getDiscordAuthorizationUrl()
    })
  ],
  // TODO
  // pages: {
  //   signIn: '/login',
  // },
  callbacks: {
    session: async ({ session }) => {
      const { user } = session
      if (!isNil(user) && !isNilOrEmpty(user.name)) {
        const foundUser = await findUserByUsername(user.name)
        const userWithId = await setUserIdIfNeeded(foundUser!)
        const sessionToken = await getSessionToken(userWithId.id)
        await updateDiscordUserIfNeeded(userWithId.id)
        // TODO get the chain id
        await updateUserNftsIfNeeded(userWithId, 1)
        return {
          ...session,
          user: {
            ...omit(['updatedAt'], userWithId),
            sessionToken
          }
        }
      }
      return session
    }
  }
}
