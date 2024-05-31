import { getAvatarDecorationUrl } from '@echo/frontend/lib/auth/get-avatar-decoration-url'
import { getDiscordAvatarUrl } from '@echo/frontend/lib/auth/get-discord-avatar-url'
import { getDiscordBannerUrl } from '@echo/frontend/lib/auth/get-discord-banner-url'
import type { DiscordProfile } from '@echo/model/types/discord-profile'
import type { DiscordProfile as ProviderDiscordProfile } from 'next-auth/providers/discord'
import { applySpec, prop } from 'ramda'

export function mapDiscordProfile(profile: Partial<ProviderDiscordProfile>): DiscordProfile {
  return applySpec<DiscordProfile>({
    accentColor: prop('accent_color'),
    avatar: prop('avatar'),
    avatarUrl: getDiscordAvatarUrl,
    avatarDecorationUrl: getAvatarDecorationUrl,
    bannerColor: prop('banner_color'),
    bannerUrl: getDiscordBannerUrl,
    discriminator: prop('discriminator'),
    globalName: prop('global_name'),
    id: prop('id'),
    username: prop('username')
  })(profile)
}
