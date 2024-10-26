import { imageExtension } from '@echo/auth/helpers/providers/discord/image-extension'
import type { DiscordProfile } from 'next-auth/providers/discord'
import { isNil } from 'ramda'

export function avatarUrl(profile: DiscordProfile): string {
  if (isNil(profile.avatar)) {
    const defaultAvatarNumber = parseInt(profile.discriminator, 10) % 5
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
  }
  const format = imageExtension(profile.avatar)
  return `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
}
