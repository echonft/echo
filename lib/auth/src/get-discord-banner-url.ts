import { getDiscordImageFormat } from '@echo/auth/get-discord-image-format'
import type { Nullable } from '@echo/utils/types/nullable'
import { type DiscordProfile } from 'next-auth/providers/discord'
import { isNil } from 'ramda'

export function getDiscordBannerUrl(profile: DiscordProfile): Nullable<string> {
  if (isNil(profile.banner)) {
    return undefined
  }
  const format = getDiscordImageFormat(profile.banner)
  return `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.${format}`
}
