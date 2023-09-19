import { FirestoreAdapter } from '@auth/firebase-adapter'
import { getDiscordAuthorizationUrl } from '@echo/discord/config/get-discord-authorization-url'
import { getDiscordConfig } from '@echo/discord/config/get-discord-config'
import { authFirestore } from '@echo/firestore/constants/auth-firestore'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { getSessionToken } from '@server/helpers/auth/get-session-token'
import { setUserIdIfNeeded } from '@server/helpers/user/set-user-id-if-needed'
import { updateDiscordUserIfNeeded } from '@server/helpers/user/update-discord-user-if-needed'
import { updateUserNftsIfNeeded } from '@server/helpers/user/update-user-nfts-if-needed'
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
  // TODO
  // pages: {
  //   signIn: '/login',
  // },
  callbacks: {
    session: async ({ session }) => {
      const { user } = session
      initializeFirebase()
      const id = await setUserIdIfNeeded(user.name)
      const sessionToken = getSessionToken(id)
      await updateDiscordUserIfNeeded(user)
      // TODO get the chain id
      await updateUserNftsIfNeeded(user, 1)
      await terminateFirestore()
      return {
        ...session,
        user: {
          ...user,
          id,
          sessionToken
        }
      }
    }
  }
}
