import { mapDiscordProfile } from '@echo/frontend/lib/auth/map-discord-profile'
import { mapUser } from '@echo/frontend/lib/auth/map-user'
import type { User } from 'next-auth'
import type { DiscordProfile as ProviderDiscordProfile } from 'next-auth/providers/discord'

describe('auth - mapUser', () => {
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
  const user: Omit<User, 'createdAt' | 'updatedAt'> = {
    id: 'username',
    username: 'username',
    discord: mapDiscordProfile(providerProfile)
  }
  test('base mapping', () => {
    expect(mapUser(providerProfile)).toStrictEqual(user)
  })
})
