import { DiscordProfile } from 'next-auth/providers/discord'
import { isNil } from 'ramda'

export function getAvatarDecorationUrl(profile: DiscordProfile & { avatar_decoration?: string }): string | undefined {
  if (isNil(profile.avatar_decoration)) {
    return undefined
  }
  return `https://cdn.discordapp.com/avatar-decorations/${profile.id}/${profile.avatar_decoration}.png`
}
