import type { JWT } from '@auth/core/jwt'
import { getAvatarDecorationUrl } from '@echo/frontend/lib/helpers/auth/get-avatar-decoration-url'
import { getDiscordAvatarUrl } from '@echo/frontend/lib/helpers/auth/get-discord-avatar-url'
import { getDiscordBannerUrl } from '@echo/frontend/lib/helpers/auth/get-discord-banner-url'
import type { AuthUser } from '@echo/model/types/auth-user'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { type NextAuthConfig } from 'next-auth'
import Discord, { type DiscordProfile } from 'next-auth/providers/discord'
import { assoc, dissoc, either, isNil, path } from 'ramda'

export const authConfig: NextAuthConfig = {
  providers: [
    Discord({
      authorization: 'https://discord.com/api/oauth2/authorize?scope=identify',
      profile: (profile: DiscordProfile, _tokens) => {
        // await updateAccount(profile.id, mapTokenSetToFirestoreAccount(tokens))
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
    authorized: () => {
      return true
    },
    session: (params) => {
      const { session } = params
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (either(propIsNil('token'), pathIsNil(['token', 'user']))(params)) {
        return session
      }
      const user = path(['token', 'user'], params) as AuthUser
      return assoc('user', user, session)
    },
    jwt: ({ token, user }) => {
      if (!isNil(user)) {
        return Promise.resolve(assoc('user', dissoc('id', user), token) as JWT)
      }
      return token
    }
  }
  // callbacks: {
  //   session: async ({ session, user }) => {
  //     logger.info('session callback')
  //     if (isNil(user)) {
  //       setUser(null)
  //       return session
  //     } else {
  //       const { username } = user as unknown as AuthUser
  //       initializeFirebase()
  //       const firestoreUser = await findUserByUsername(username)
  //       if (isNil(firestoreUser)) {
  //         setUser(null)
  //         return session
  //       }
  //       const { id } = firestoreUser
  //       const sessionToken = await findSessionByUserId(id)
  //       const wallets = await getWalletsForUser(id)
  //       const authUser = pipe(
  //         assoc('wallets', map(mapWalletDocumentDataToWallet, wallets)),
  //         unless(always(isNil(sessionToken)), assoc('sessionToken', sessionToken?.sessionToken))
  //       )(user) as AuthUser
  //       setUser({
  //         id,
  //         username
  //       })
  //       return assoc('user', authUser, session)
  //     }
  //   }
  // },
  // events: {
  //   signIn: (args) => {
  //     console.info('signIn EVENT')
  //     console.info(JSON.stringify(args))
  //   },
  //   signOut: (args) => {
  //     console.info('signOut EVENT')
  //     console.info(JSON.stringify(args))
  //   },
  //   createUser: (args) => {
  //     console.info('createUser EVENT')
  //     console.info(JSON.stringify(args))
  //   },
  //   updateUser: (args) => {
  //     console.info('updateUser EVENT')
  //     console.info(JSON.stringify(args))
  //   },
  //   linkAccount: (args) => {
  //     console.info('linkAccount EVENT')
  //     console.info(JSON.stringify(args))
  //   },
  //   session: (args) => {
  //     console.info('session EVENT')
  //     console.info(JSON.stringify(args))
  //   }
  // }
}
