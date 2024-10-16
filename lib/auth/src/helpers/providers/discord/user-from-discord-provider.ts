import { userDiscordProfileFromDiscordProvider } from '@echo/auth/helpers/providers/discord/user-discord-profile-from-discord-provider'
import type { User } from '@echo/auth/types/user'
import type { DiscordProfile } from 'next-auth/providers/discord'
import { applySpec, pipe, prop, toLower } from 'ramda'

export function userFromDiscordProvider(profile: DiscordProfile): User {
  return applySpec<User>({
    id: pipe(prop('username'), toLower),
    username: pipe(prop('username'), toLower),
    discord: userDiscordProfileFromDiscordProvider
  })(profile)
}
