import { avatarUrl } from '@echo/auth/helpers/providers/discord/avatar-url'
import type { DiscordProfileResponse } from '@echo/auth/types/discord-profile-response'
import type { User } from '@echo/model/types/user'
import { always, applySpec, assoc, isNil, pipe, prop, unless } from 'ramda'

export function userDiscordProfileFromDiscordProvider(response: DiscordProfileResponse): User['discord'] {
  return pipe(
    applySpec<User['discord']>({
      avatarUrl: avatarUrl,
      username: prop('username')
    }),
    unless<User['discord'], User['discord']>(
      always(isNil(response.global_name)),
      assoc('globalName', response.global_name)
    )
  )(response)
}
