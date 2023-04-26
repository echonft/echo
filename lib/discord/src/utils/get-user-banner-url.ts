import { User } from '@echo/model'

// TODO confirm that a user banner is still returned from Discord even though the user doesn't have one (I assume an image of a plain color would be returned)
export const getUserBannerUrl = (user: User, size: number, format: 'png' | 'jpg' | 'webp' | 'gif' = 'png'): string =>
  `https://cdn.discordapp.com/banners/${user.discordId}/${user.discordAvatar!}.${format}?size=${size}`
