import type { JWT } from '@auth/core/jwt'
import type { Account, Profile, User } from '@auth/core/types'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { UpdateUserRequest } from '@echo/api/types/requests/update-user-request'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import { getAvatarDecorationUrl } from '@echo/frontend/lib/helpers/auth/get-avatar-decoration-url'
import { getDiscordAvatarUrl } from '@echo/frontend/lib/helpers/auth/get-discord-avatar-url'
import { getDiscordBannerUrl } from '@echo/frontend/lib/helpers/auth/get-discord-banner-url'
import { nextFetch } from '@echo/frontend/lib/services/fetch/next-fetch'
import type { AuthUser } from '@echo/model/types/auth-user'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { type NextAuthConfig } from 'next-auth'
import Discord, { type DiscordProfile } from 'next-auth/providers/discord'
import { assoc, dissoc, either, isNil, path, pick, pipe, prop } from 'ramda'

interface SigninEvent {
  user: User
  account: Account | null
  profile?: Profile
  isNewUser?: boolean
}

export const authConfig: NextAuthConfig = {
  callbacks: {
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
  },
  events: {
    signIn: async (event: SigninEvent) => {
      const request = pipe<[SigninEvent], User, Pick<User, 'discord'>>(prop('user'), pick(['discord']))(event)
      await nextFetch.post<EmptyResponse, UpdateUserRequest>(apiUrlProvider.admin.updateUser.getUrl(), {
        bearerToken: process.env.ADMIN_TOKEN,
        data: request
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
          },
          createdAt: 0,
          updatedAt: 0
        }
      }
    })
  ]
}
