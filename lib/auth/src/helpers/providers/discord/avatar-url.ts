import { imageExtension } from '@echo/auth/helpers/providers/discord/image-extension'
import type { DiscordProfileResponse } from '@echo/auth/types/discord-profile-response'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'

export function avatarUrl(response: DiscordProfileResponse): string {
  if (isNilOrEmpty(response.avatar)) {
    const defaultAvatarNumber = response.discriminator % 5
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
  }
  const format = imageExtension(response.avatar)
  return `https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.${format}`
}
