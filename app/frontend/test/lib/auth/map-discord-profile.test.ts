import { mapDiscordProfile } from '@echo/frontend/lib/auth/map-discord-profile'
import type { DiscordProfile } from '@echo/model/types/discord-profile'
import type { DiscordProfile as ProviderDiscordProfile } from 'next-auth/providers/discord'
import { assoc, pipe } from 'ramda'

describe('auth - mapDiscordProfile', () => {
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
  const profile: DiscordProfile = {
    accentColor: 1,
    avatar: 'avatar',
    avatarDecorationUrl: 'https://cdn.discordapp.com/avatar-decorations/id/avatar_decoration.png', // test more
    avatarUrl: 'https://cdn.discordapp.com/avatars/id/avatar.png', // test
    bannerColor: 'banner_color',
    bannerUrl: 'https://cdn.discordapp.com/banners/id/banner.png',
    discriminator: '5',
    globalName: 'global_name',
    id: 'id',
    username: 'username'
  }

  test('base mapping', () => {
    expect(mapDiscordProfile(providerProfile)).toStrictEqual(profile)
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
    const updatedProfile: DiscordProfile = pipe(
      assoc('avatar', undefined),
      assoc('avatarUrl', 'https://cdn.discordapp.com/embed/avatars/0.png'),
      assoc('globalName', undefined),
      assoc('bannerUrl', undefined),
      assoc('accentColor', undefined),
      assoc('avatarDecorationUrl', undefined),
      assoc('bannerColor', undefined)
    )(profile) as DiscordProfile
    expect(mapDiscordProfile(updatedProviderProfile)).toStrictEqual(updatedProfile)
  })
})
