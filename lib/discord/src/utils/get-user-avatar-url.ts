import { User } from '@echo/model'

// TODO confirm that a user avatar is still returned from Discord even though the user doesn't have one (I assume one of the default avatars would be returned)
export const getUserAvatarUrl = (user: User, size: number, format: 'png' | 'jpg' | 'webp' | 'gif' = 'png'): string =>
  `https://cdn.discordapp.com/avatars/${user.discordId}/${user.discordAvatar!}.${format}?size=${size}`
