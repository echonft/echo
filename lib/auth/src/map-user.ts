import { mapDiscordProfile } from '@echo/auth/map-discord-profile'
import type { User } from 'next-auth'
import type { DiscordProfile } from 'next-auth/providers/discord'
import { applySpec, pipe, prop, toLower } from 'ramda'

export function mapUser(profile: DiscordProfile): User {
  return applySpec<User>({
    id: pipe(prop('username'), toLower),
    username: pipe(prop('username'), toLower),
    discord: mapDiscordProfile
  })(profile)
}
