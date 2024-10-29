import { userDiscordProfileFromDiscordProvider } from '@echo/auth/helpers/providers/discord/user-discord-profile-from-discord-provider'
import type { DiscordProfileResponse } from '@echo/auth/types/discord-profile-response'
import type { User } from '@echo/model/types/user'
import { applySpec, pipe, prop, toLower } from 'ramda'

export function userFromDiscordProvider(response: DiscordProfileResponse): User & Record<'id', string> {
  return applySpec<User & Record<'id', string>>({
    id: pipe(prop('username'), toLower),
    username: pipe(prop('username'), toLower),
    discord: userDiscordProfileFromDiscordProvider
  })(response)
}
