import { DiscordProfile } from 'next-auth/providers/discord'
import { isNil } from 'ramda'

export function getDiscordAvatarUrl(profile: DiscordProfile): string {
  if (isNil(profile.avatar)) {
    const defaultAvatarNumber = parseInt(profile.discriminator) % 5
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
  }
  const format = profile.avatar.startsWith('a_') ? 'gif' : 'png'
  return `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
}
