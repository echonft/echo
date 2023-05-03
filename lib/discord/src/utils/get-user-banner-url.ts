import { User } from '@echo/model'
import { isPowerOfTwo } from '@echo/utils'
import { isNil } from 'ramda'

export const getUserBannerUrl = (
  user: User,
  size: number,
  format: 'png' | 'jpg' | 'webp' | 'gif' = 'png'
): string | undefined => {
  if (!isPowerOfTwo(size)) {
    throw Error(`Wrong size ${size}: size must be a power of two`)
  }
  if (isNil(user.discordBanner)) {
    return undefined
  }
  return `https://cdn.discordapp.com/banners/${user.discordId}/${user.discordBanner}.${format}?size=${size}`
}
