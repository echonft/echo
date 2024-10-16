import { userDiscordProfileFromDiscordProvider } from '@echo/auth/helpers/providers/discord/user-discord-profile-from-discord-provider'
import { userFromDiscordProvider } from '@echo/auth/helpers/providers/discord/user-from-discord-provider'
import { describe, expect, test } from '@jest/globals'
import type { User } from 'next-auth'
import type { DiscordProfile as ProviderDiscordProfile } from 'next-auth/providers/discord'

describe('helpers - providers - discord - userDiscordProfileFromDiscordProvider', () => {
  const providerProfile: ProviderDiscordProfile = {
    id: 'id',
    username: 'UseRnAme',
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
  const user: User = {
    id: 'username',
    username: 'username',
    discord: userDiscordProfileFromDiscordProvider(providerProfile)
  }
  test('base mapping', () => {
    expect(userFromDiscordProvider(providerProfile)).toStrictEqual(user)
  })
})
