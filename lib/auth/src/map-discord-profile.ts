import { getAvatarDecorationUrl } from '@echo/auth/get-avatar-decoration-url'
import { getDiscordAvatarUrl } from '@echo/auth/get-discord-avatar-url'
import { getDiscordBannerUrl } from '@echo/auth/get-discord-banner-url'
import type { DiscordProfile } from '@echo/model/types/discord-profile'
import { convertNullToUndefined } from '@echo/utils/fp/convert-null-to-undefined'
import type { DiscordProfile as ProviderDiscordProfile } from 'next-auth/providers/discord'
import { applySpec, pipe, prop } from 'ramda'

export function mapDiscordProfile(profile: Partial<ProviderDiscordProfile>): DiscordProfile {
  return applySpec<DiscordProfile>({
    accentColor: pipe(prop('accent_color'), convertNullToUndefined),
    avatar: pipe(prop('avatar'), convertNullToUndefined),
    avatarUrl: getDiscordAvatarUrl,
    avatarDecorationUrl: getAvatarDecorationUrl,
    bannerColor: pipe(prop('banner_color'), convertNullToUndefined),
    bannerUrl: getDiscordBannerUrl,
    discriminator: prop('discriminator'),
    globalName: pipe(prop('global_name'), convertNullToUndefined),
    id: prop('id'),
    username: prop('username')
  })(profile)
}
