import { getDiscordImageFormat } from '@echo/frontend/lib/helpers/auth/get-discord-image-format'
import { type DiscordProfile } from 'next-auth/providers/discord'
import { isNil } from 'ramda'

export function getDiscordBannerUrl(profile: DiscordProfile): string | undefined {
  if (isNil(profile.banner)) {
    return undefined
  }
  const format = getDiscordImageFormat(profile.banner)
  return `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.${format}`
}
