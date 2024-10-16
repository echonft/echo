import type { UserDiscordProfile } from '@echo/model/types/user/user-discord-profile'
import { convertNullToUndefined } from '@echo/utils/fp/convert-null-to-undefined'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DiscordProfile, DiscordProfile as ProviderDiscordProfile } from 'next-auth/providers/discord'
import { applySpec, isNil, pipe, prop } from 'ramda'

function imageExtension(hash: string): 'gif' | 'png' {
  if (hash.startsWith('a_')) {
    return 'gif'
  }
  return 'png'
}

function bannerUrl(profile: DiscordProfile): Nullable<string> {
  if (isNil(profile.banner)) {
    return undefined
  }
  const format = imageExtension(profile.banner)
  return `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.${format}`
}

function avatarUrl(profile: DiscordProfile): string {
  if (isNil(profile.avatar)) {
    const defaultAvatarNumber = parseInt(profile.discriminator, 10) % 5
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
  }
  const format = imageExtension(profile.avatar)
  return `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
}

function avatarDecorationUrl(profile: DiscordProfile): Nullable<string> {
  if (isNil(profile.avatar_decoration)) {
    return undefined
  }
  return `https://cdn.discordapp.com/avatar-decorations/${profile.id}/${profile.avatar_decoration}.png`
}

export function userDiscordProfileFromDiscordProvider(profile: Partial<ProviderDiscordProfile>): UserDiscordProfile {
  return applySpec<UserDiscordProfile>({
    accentColor: pipe(prop('accent_color'), convertNullToUndefined),
    avatar: pipe(prop('avatar'), convertNullToUndefined),
    avatarUrl: avatarUrl,
    avatarDecorationUrl: avatarDecorationUrl,
    bannerColor: pipe(prop('banner_color'), convertNullToUndefined),
    bannerUrl: bannerUrl,
    discriminator: prop('discriminator'),
    globalName: pipe(prop('global_name'), convertNullToUndefined),
    id: prop('id'),
    username: prop('username')
  })(profile)
}
