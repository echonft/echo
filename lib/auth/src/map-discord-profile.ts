import { getAvatarDecorationUrl } from '@echo/auth/get-avatar-decoration-url'
import { getDiscordAvatarUrl } from '@echo/auth/get-discord-avatar-url'
import { getDiscordBannerUrl } from '@echo/auth/get-discord-banner-url'
import type { DiscordProfile } from '@echo/model/types/discord-profile'
import { removeNull } from '@echo/utils/fp/remove-null'
import type { DiscordProfile as ProviderDiscordProfile } from 'next-auth/providers/discord'
import { applySpec, pipe, prop } from 'ramda'

export function mapDiscordProfile(profile: Partial<ProviderDiscordProfile>): DiscordProfile {
  return applySpec<DiscordProfile>({
    accentColor: pipe(prop('accent_color'), removeNull),
    avatar: pipe(prop('avatar'), removeNull),
    avatarUrl: getDiscordAvatarUrl,
    avatarDecorationUrl: getAvatarDecorationUrl,
    bannerColor: pipe(prop('banner_color'), removeNull),
    bannerUrl: getDiscordBannerUrl,
    discriminator: prop('discriminator'),
    globalName: pipe(prop('global_name'), removeNull),
    id: prop('id'),
    username: prop('username')
  })(profile)
}
