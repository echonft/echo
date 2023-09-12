import isPowerOfTwo from '@echo/utils/is-power-of-two'
import { isNil } from 'ramda'

export const getUserAvatarUrl = (
  discordId: string,
  discordAvatar: string | undefined,
  size: number,
  format: 'png' | 'jpg' | 'webp' | 'gif' = 'png'
): URL | undefined => {
  if (!isPowerOfTwo(size)) {
    throw Error(`Wrong size ${size}: size must be a power of two`)
  }
  if (isNil(discordAvatar)) {
    return undefined
  }
  return new URL(`https://cdn.discordapp.com/avatars/${discordId}/${discordAvatar}.${format}?size=${size}`)
}
