import { isPowerOfTwo } from '@echo/utils/number/is-power-of-two'
import { isNil } from 'ramda'

export const getUserBannerUrl = (
  discordId: string,
  discordBanner: string | undefined,
  size: number,
  format: 'png' | 'jpg' | 'webp' | 'gif' = 'png'
): URL | undefined => {
  if (!isPowerOfTwo(size)) {
    throw Error(`Wrong size ${size}: size must be a power of two`)
  }
  if (isNil(discordBanner)) {
    return undefined
  }
  return new URL(`https://cdn.discordapp.com/banners/${discordId}/${discordBanner}.${format}?size=${size}`)
}
