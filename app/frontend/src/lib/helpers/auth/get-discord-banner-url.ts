import { DiscordProfile } from 'next-auth/providers/discord'
import { isNil } from 'ramda'

export function getDiscordBannerUrl(profile: DiscordProfile): string | undefined {
  if (isNil(profile.banner)) {
    return undefined
  }
  const format = profile.avatar.startsWith('a_') ? 'gif' : 'png'
  return `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.${format}`
}
