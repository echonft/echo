import type { Account, Profile, User } from '@auth/core/types'
import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import { isPathSecure } from '@echo/api/routing/is-path-secure'
import { getAvatarDecorationUrl } from '@echo/frontend/lib/auth/get-avatar-decoration-url'
import { getDiscordAvatarUrl } from '@echo/frontend/lib/auth/get-discord-avatar-url'
import { getDiscordBannerUrl } from '@echo/frontend/lib/auth/get-discord-banner-url'
import type { AuthUser } from '@echo/model/types/auth-user'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { type NextAuthConfig } from 'next-auth'
import Discord, { type DiscordProfile } from 'next-auth/providers/discord'
import { assoc, both, complement, dissoc, either, isNil, path, pick, pipe, prop } from 'ramda'

interface SigninEvent {
  user: User
  account: Account | null
  profile?: Profile
  isNewUser?: boolean
}

export const authConfig: NextAuthConfig = {
  callbacks: {
    authorized: function (params) {
      return complement(
        both(
          pipe(nonNullableReturn(path(['request', 'nextUrl', 'pathname'])), isPathSecure),
          pathIsNil(['auth', 'user'])
        )
      )(params)
    },
    jwt: function ({ token, user }) {
      if (!isNil(user)) {
        return Promise.resolve(assoc('user', dissoc('id', user), token))
      }
      return token
    },
    session: function (params) {
      const { session } = params
      if (either(propIsNil('token'), pathIsNil(['token', 'user']))(params)) {
        return session
      }
      const user: AuthUser = path(['token', 'user'], params)!
      return assoc('user', user, session)
    }
  },
  events: {
    signIn: async function (event: SigninEvent) {
      const request = pipe<[SigninEvent], User, Pick<User, 'discord'>, string>(
        prop('user'),
        pick(['discord']),
        JSON.stringify
      )(event)
      // TODO replace with Cloud Function
      await fetch(apiUrlProvider.admin.updateUser.getUrl(), {
        headers: {
          Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: request
      })
    }
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    Discord({
      authorization: 'https://discord.com/api/oauth2/authorize?scope=identify',
      profile: (profile: DiscordProfile, _tokens) => {
        return {
          id: profile.id,
          username: profile.username,
          discord: {
            avatarUrl: getDiscordAvatarUrl(profile),
            avatarDecorationUrl: getAvatarDecorationUrl(profile),
            bannerColor: profile.banner_color ?? undefined,
            bannerUrl: getDiscordBannerUrl(profile),
            id: profile.id,
            username: profile.username
          }
        }
      }
    })
  ]
}
