import { FirestoreAdapter } from '@auth/firebase-adapter'
import { getDiscordAuthorizationUrl } from '@echo/discord/config/get-discord-authorization-url'
import { getDiscordConfig } from '@echo/discord/config/get-discord-config'
import { updateAccount } from '@echo/firestore/crud/account/update-account'
import { findSessionByUserId } from '@echo/firestore/crud/session/find-session-by-user-id'
import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/map-wallet-document-data-to-wallet'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { getAvatarDecorationUrl } from '@echo/frontend/lib/helpers/auth/get-avatar-decoration-url'
import { getDiscordAvatarUrl } from '@echo/frontend/lib/helpers/auth/get-discord-avatar-url'
import { getDiscordBannerUrl } from '@echo/frontend/lib/helpers/auth/get-discord-banner-url'
import { mapTokenSetToFirestoreAccount } from '@echo/frontend/lib/helpers/auth/map-token-set-to-firestore-account'
import { setUserId } from '@echo/frontend/lib/server/helpers/user/set-user-id'
import { type AuthUser } from '@echo/model/types/auth-user'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { type AuthOptions } from 'next-auth'
import Discord, { type DiscordProfile } from 'next-auth/providers/discord'
import { always, assoc, complement, either, has, isNil, map, pipe, unless } from 'ramda'

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
      if (!isNil(user)) {
        const { id } = user
        const firestoreUser = await findUserById(id)
        if (either(complement(has('id')), propIsNil('id'))(firestoreUser)) {
          await setUserId(user.username)
        }
        const sessionToken = await findSessionByUserId(id)
        const wallets = await getWalletsForUser(id)
        const authUser = pipe(
          assoc('wallets', map(mapWalletDocumentDataToWallet, wallets)),
          unless(always(isNil(sessionToken)), assoc('sessionToken', sessionToken?.sessionToken))
        )(user) as AuthUser
        // TODO get the chain id
        // FIXME this cannot be here
        // await updateUserNfts(authUser, 1)
        return {
          ...session,
          user: authUser
        }
      }
      return session
    }
  }
}
