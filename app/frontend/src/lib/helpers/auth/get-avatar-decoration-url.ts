import { type DiscordProfile } from 'next-auth/providers/discord'
import { isNil } from 'ramda'

export function getAvatarDecorationUrl(
  profile: DiscordProfile & Partial<Record<'avatar_decoration', string | undefined>>
): string | undefined {
  if (isNil(profile.avatar_decoration)) {
    return undefined
  }
  return `https://cdn.discordapp.com/avatar-decorations/${profile.id}/${profile.avatar_decoration}.png`
}
