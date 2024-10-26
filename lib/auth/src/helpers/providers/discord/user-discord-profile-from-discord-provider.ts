import { avatarUrl } from '@echo/auth/helpers/providers/discord/avatar-url'
import type { User } from '@echo/model/types/user'
import type { DiscordProfile as ProviderDiscordProfile } from 'next-auth/providers/discord'
import { always, applySpec, assoc, isNil, pipe, prop, unless } from 'ramda'

export function userDiscordProfileFromDiscordProvider(
  profile: Partial<ProviderDiscordProfile> & Required<Pick<ProviderDiscordProfile, 'id' | 'username'>>
): User['discord'] {
  return pipe(
    applySpec<User['discord']>({
      avatarUrl: avatarUrl,
      username: prop('username')
    }),
    unless<User['discord'], User['discord']>(
      always(isNil(profile.global_name)),
      assoc('globalName', profile.global_name)
    )
  )(profile)
}
