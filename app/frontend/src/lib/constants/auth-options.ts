import { FirestoreAdapter } from '@auth/firebase-adapter'
import { getDiscordAuthorizationUrl } from '@echo/discord/config/get-discord-authorization-url'
import { getDiscordConfig } from '@echo/discord/config/get-discord-config'
import { updateAccount } from '@echo/firestore/crud/account/update-account'
import { findSessionByUserId } from '@echo/firestore/crud/session/find-session-by-user-id'
import { setUserUpdated } from '@echo/firestore/crud/user/set-user-updated'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { mapWalletToWalletData } from '@echo/firestore/mappers/map-wallet-to-wallet-data'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { getAvatarDecorationUrl } from '@helpers/auth/get-avatar-decoration-url'
import { getDiscordAvatarUrl } from '@helpers/auth/get-discord-avatar-url'
import { getDiscordBannerUrl } from '@helpers/auth/get-discord-banner-url'
import { mapTokenSetToFirestoreAccount } from '@helpers/auth/map-token-set-to-firestore-account'
import { setUserId } from '@server/helpers/user/set-user-id'
import { updateUserNfts } from '@server/helpers/user/update-user-nfts'
import type { AuthOptions } from 'next-auth'
import Discord, { DiscordProfile } from 'next-auth/providers/discord'
import { always, assoc, isNil, map, pipe, unless } from 'ramda'

export const authOptions: AuthOptions = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  adapter: FirestoreAdapter(initializeFirebase()),
  providers: [
    Discord({
      clientId: getDiscordConfig().clientId,
      clientSecret: getDiscordConfig().clientSecret,
      authorization: getDiscordAuthorizationUrl(),
      profile: async (profile: DiscordProfile, tokens) => {
        await updateAccount(profile.id, mapTokenSetToFirestoreAccount(tokens))
        return {
          id: profile.id,
          username: profile.username,
          discord: {
            avatarUrl: getDiscordAvatarUrl(profile),
            avatarDecorationUrl: getAvatarDecorationUrl(profile as DiscordProfile & { avatar_decoration?: string }),
            bannerColor: profile.banner_color,
            bannerUrl: getDiscordBannerUrl(profile),
            id: profile.id,
            username: profile.username
          }
        }
      }
    })
  ],
  // TODO
  // pages: {
  //   signIn: '/login',
  // },
  callbacks: {
    session: async ({ session, user }) => {
      if (!isNilOrEmpty(user)) {
        const userId = await setUserId(user)
        const sessionToken = await findSessionByUserId(userId)
        const wallets = await getWalletsForUser(userId)
        const authUser = pipe(
          assoc('id', userId),
          assoc('wallets', map(mapWalletToWalletData, wallets)),
          unless(always(isNil(sessionToken)), assoc('sessionToken', sessionToken?.sessionToken))
        )(user) as AuthUser
        // TODO get the chain id
        await updateUserNfts(authUser, 1)
        await setUserUpdated(userId)
        return {
          ...session,
          user: authUser
        }
      }
      return session
    }
  }
}
