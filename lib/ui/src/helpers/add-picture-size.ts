import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import { PICTURE_SIZE_MD, PICTURE_SIZES } from '@echo/ui/constants/picture-size'
import type { PictureSize } from '@echo/ui/types/picture-size'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { getBaseUrl } from '@echo/utils/helpers/get-base-url'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import type { ImageProps } from 'next/image'
import { __, filter, isEmpty, isNil, length, lte, reduce } from 'ramda'

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

// TODO update db instead
function convertIpfsScheme(src: string): string {
  if (isEmpty(src)) {
    return src
  }
  try {
    if (src.startsWith('ipfs://')) {
      return apiUrlProvider.ipfs.proxy.getUrl({ path: src.slice(7) })
    }
    return src
  } catch (e) {
    return src
  }
}
export function addPictureSize(
  args: WithLoggerType<
    Partial<Omit<ImageProps, 'loader' | 'unoptimized' | 'src' | 'overrideSrc' | 'width'>> &
      Record<'src', Nullable<string>> &
      Record<'width', number>
  >
): string {
  if (isNil(args.src)) {
    return ''
  }
  const size = getSize(args.width)
  if (isNilOrEmpty(args.src) || isNil(size)) {
    if (!isNil(size) && size < PICTURE_SIZE_MD) {
      return 'https://storage.googleapis.com/echo-dev-public/not-found-nft-small.png?alt=media'
    }
    return 'https://storage.googleapis.com/echo-dev-public/not-found-nft.png?alt=media'
  }
  try {
    const src = convertIpfsScheme(args.src)
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
    args.logger?.error({ err, fn: 'addPictureSize' })
    return args.src
  }
}
