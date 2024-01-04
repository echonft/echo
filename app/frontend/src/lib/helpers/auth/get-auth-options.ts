import { FirestoreAdapter } from '@auth/firebase-adapter'
import { updateAccount } from '@echo/firestore/crud/account/update-account'
import { findSessionByUserId } from '@echo/firestore/crud/session/find-session-by-user-id'
import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { setUserId } from '@echo/firestore/crud/user/set-user-id'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/map-wallet-document-data-to-wallet'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { getAvatarDecorationUrl } from '@echo/frontend/lib/helpers/auth/get-avatar-decoration-url'
import { getDiscordAvatarUrl } from '@echo/frontend/lib/helpers/auth/get-discord-avatar-url'
import { getDiscordBannerUrl } from '@echo/frontend/lib/helpers/auth/get-discord-banner-url'
import { getDiscordClientId } from '@echo/frontend/lib/helpers/auth/get-discord-client-id'
import { getDiscordClientSecret } from '@echo/frontend/lib/helpers/auth/get-discord-client-secret'
import { mapTokenSetToFirestoreAccount } from '@echo/frontend/lib/helpers/auth/map-token-set-to-firestore-account'
import type { AuthUser } from '@echo/model/types/auth-user'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { setUser } from '@sentry/nextjs'
import type { AuthOptions } from 'next-auth'
import Discord, { type DiscordProfile } from 'next-auth/providers/discord'
import { always, assoc, complement, either, has, isNil, map, pick, pipe, unless } from 'ramda'

export function getAuthOptions(): AuthOptions {
  const firestore = initializeFirebase()
  const adapter = FirestoreAdapter(firestore)
  const clientId = getDiscordClientId()
  const clientSecret = getDiscordClientSecret()

  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    adapter,
    providers: [
      Discord({
        clientId,
        clientSecret,
        authorization: 'https://discord.com/api/oauth2/authorize?scope=identify',
        profile: async (profile: DiscordProfile & Partial<Record<'avatar_decoration', string | undefined>>, tokens) => {
          await updateAccount(profile.id, mapTokenSetToFirestoreAccount(tokens))
          return {
            id: profile.id,
            username: profile.username,
            discord: {
              avatarUrl: getDiscordAvatarUrl(profile),
              avatarDecorationUrl: getAvatarDecorationUrl(profile),
              bannerColor: profile.banner_color,
              bannerUrl: getDiscordBannerUrl(profile),
              id: profile.id,
              username: profile.username
            }
          }
        }
      })
    ],
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
          setUser(pick(['id', 'username'], user))
          return {
            ...session,
            user: authUser
          }
        } else {
          setUser(null)
        }
        return session
      }
    }
  }
}
