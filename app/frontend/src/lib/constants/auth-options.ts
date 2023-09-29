import { FirestoreAdapter } from '@auth/firebase-adapter'
import { getDiscordAuthorizationUrl } from '@echo/discord/config/get-discord-authorization-url'
import { getDiscordConfig } from '@echo/discord/config/get-discord-config'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { mapWalletToWalletData } from '@echo/firestore/mappers/map-wallet-to-wallet-data'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { logger } from '@echo/utils/services/logger'
import { getSessionToken } from '@server/helpers/auth/get-session-token'
import { setUserId } from '@server/helpers/user/set-user-id'
import { updateUserNfts } from '@server/helpers/user/update-user-nfts'
import type { AuthOptions } from 'next-auth'
import Discord, { DiscordProfile } from 'next-auth/providers/discord'
import { assoc, isNil, map, pipe } from 'ramda'

function getDiscordAvatarUrl(profile: DiscordProfile): string {
  if (isNil(profile.avatar)) {
    const defaultAvatarNumber = parseInt(profile.discriminator) % 5
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
  }
  const format = profile.avatar.startsWith('a_') ? 'gif' : 'png'
  return `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
}

function getDiscordBannerUrl(profile: DiscordProfile): string | undefined {
  if (isNil(profile.banner)) {
    return undefined
  }
  const format = profile.avatar.startsWith('a_') ? 'gif' : 'png'
  return `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.${format}`
}

function getAvatarDecorationUrl(profile: DiscordProfile & { avatar_decoration?: string }): string | undefined {
  if (isNil(profile.avatar_decoration)) {
    return undefined
  }
  return `https://cdn.discordapp.com/avatar-decorations/${profile.id}/${profile.avatar_decoration}.png`
}

export const authOptions: AuthOptions = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  adapter: FirestoreAdapter(initializeFirebase()),
  providers: [
    Discord({
      clientId: getDiscordConfig().clientId,
      clientSecret: getDiscordConfig().clientSecret,
      authorization: getDiscordAuthorizationUrl(),
      profile(profile: DiscordProfile, tokens) {
        logger.info(`profile is ${JSON.stringify(profile)}`)
        logger.info(`tokens are ${JSON.stringify(tokens)}`)
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
    session: async ({ session }) => {
      logger.info(`session is ${JSON.stringify(session)}`)
      const { user } = session
      if (!isNil(user)) {
        const userId = await setUserId(user)
        const sessionToken = await getSessionToken(userId)
        const wallets = await getWalletsForUser(userId)
        const authUser = pipe(
          assoc('id', userId),
          assoc('wallets', map(mapWalletToWalletData, wallets)),
          assoc('sessionToken', sessionToken)
        )(user) as AuthUser
        // TODO get the chain id
        await updateUserNfts(authUser, 1)
        return {
          ...session,
          user: authUser
        }
      }
      return session
    }
  }
}
