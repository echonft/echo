import { User } from '@echo/model'
import { isPowerOfTwo } from '@echo/utils'
import { isNil } from 'ramda'

export const getUserAvatarUrl = (
  user: User,
  size: number,
  format: 'png' | 'jpg' | 'webp' | 'gif' = 'png'
): string | undefined => {
  if (!isPowerOfTwo(size)) {
    throw Error(`Wrong size ${size}: size must be a power of two`)
  }
  if (isNil(user.discordAvatar)) {
    return undefined
  }
  return `https://cdn.discordapp.com/avatars/${user.discordId}/${user.discordAvatar}.${format}?size=${size}`
}
