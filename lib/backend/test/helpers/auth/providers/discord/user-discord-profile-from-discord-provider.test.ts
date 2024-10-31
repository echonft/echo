import { userDiscordProfileFromDiscordProvider } from '@echo/backend/helpers/auth/providers/discord/user-discord-profile-from-discord-provider'
import type { User } from '@echo/model/types/user'
import { describe, expect, test } from '@jest/globals'
import type { DiscordProfile as ProviderDiscordProfile } from 'next-auth/providers/discord'
import { assoc, pipe } from 'ramda'

describe('helpers - providers - discord - userDiscordProfileFromDiscordProvider', () => {
  const providerProfile: ProviderDiscordProfile = {
    id: 'id',
    username: 'username',
    discriminator: '5',
    global_name: 'global_name',
    avatar: 'avatar',
    mfa_enabled: true,
    banner: 'banner',
    accent_color: 1,
    locale: 'locale',
    verified: true,
    email: 'email',
    flags: 1,
    premium_type: 1,
    public_flags: 1,
    display_name: 'display_name',
    avatar_decoration: 'avatar_decoration',
    banner_color: 'banner_color',
    image_url: 'image_url'
  }
  const profile: User['discord'] = {
    avatarUrl: 'https://cdn.discordapp.com/avatars/id/avatar.png',
    globalName: 'global_name',
    username: 'username'
  }

  test('base mapping', () => {
    expect(userDiscordProfileFromDiscordProvider(providerProfile)).toStrictEqual(profile)
  })
  test('undefined values', () => {
    const updatedProviderProfile: ProviderDiscordProfile = pipe(
      assoc('avatar', null),
      assoc('global_name', null),
      assoc('banner', null),
      assoc('accent_color', null),
      assoc('email', null),
      assoc('display_name', null),
      assoc('avatar_decoration', null),
      assoc('banner_color', null)
    )(providerProfile) as ProviderDiscordProfile
    expect(userDiscordProfileFromDiscordProvider(updatedProviderProfile)).toStrictEqual({
      avatarUrl: 'https://cdn.discordapp.com/embed/avatars/0.png',
      username: 'username'
    })
  })
})
