import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import { PICTURE_SIZE_MD, PICTURE_SIZES } from '@echo/ui/constants/picture-size'
import type { PictureSize } from '@echo/ui/types/picture-size'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { getBaseUrl } from '@echo/utils/helpers/get-base-url'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import type { ImageLoaderProps } from 'next/image'
import { __, filter, isNil, length, lte, reduce } from 'ramda'

function getSize(width: number): Nullable<PictureSize> {
  const lteSizes: PictureSize[] = filter(lte(__, width), PICTURE_SIZES as unknown as PictureSize[])
  return reduce(
    (closest: Nullable<PictureSize>, current: PictureSize): PictureSize => {
      if (isNil(closest) || Math.abs(width - current) < Math.abs(width - closest)) {
        return current
      }
      return closest
    },
    undefined,
    lteSizes
  )
}
export function addPictureSize({ src, width }: ImageLoaderProps, logger?: Nullable<Logger>): string {
  const size = getSize(width)
  if (isNilOrEmpty(src) || isNil(size)) {
    if (!isNil(size) && size < PICTURE_SIZE_MD) {
      return 'https://storage.googleapis.com/echo-dev-public/not-found-nft-small.png?alt=media'
    }
    return 'https://storage.googleapis.com/echo-dev-public/not-found-nft.png?alt=media'
  }
  try {
    if (src.startsWith(`${getBaseUrl()}/api/ipfs`)) {
      return `${src}?img-width=${size}`
    }

    const urlObject = new URL(src)
    const hostname = urlObject.hostname
    if (hostname.includes('ipfs.io')) {
      const match = urlObject.pathname.match(/ipfs\/([^/]+)\/?/)
      if (isNil(match) || length(match) < 2 || isNil(match[1])) {
        return src
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return `${apiUrlProvider.ipfs.proxy.getUrl({ path: match[1]! })}?img-width=${size}`
    }
    if (hostname.includes('discordapp.com')) {
      return `${urlObject.href}?size=${size}`
    }
    if (hostname.includes('seadn.io')) {
      return `${urlObject.href}?w=${size}&auto=format`
    }
    if (hostname.includes('googleusercontent.com')) {
      return `${urlObject.href}=s${size}`
    }
    if (hostname.includes('nft-cdn.alchemy.com')) {
      return `https://res.cloudinary.com/alchemyapi/image/upload/w_${size}/scaled${urlObject.pathname}`
    }
    return src
  } catch (err) {
    logger?.error({ err, fn: 'addPictureSize' })
    return src
  }
}
