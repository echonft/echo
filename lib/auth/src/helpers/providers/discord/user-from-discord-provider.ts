import { userDiscordProfileFromDiscordProvider } from '@echo/auth/helpers/providers/discord/user-discord-profile-from-discord-provider'
import type { User } from '@echo/model/types/user'
import type { DiscordProfile } from 'next-auth/providers/discord'
import { applySpec, pipe, prop, toLower } from 'ramda'

export function userFromDiscordProvider(profile: DiscordProfile): User & Record<'id', string> {
  return applySpec<User & Record<'id', string>>({
    id: pipe(prop('username'), toLower),
    username: pipe(prop('username'), toLower),
    discord: userDiscordProfileFromDiscordProvider
  })(profile)
}
