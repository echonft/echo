import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import { PICTURE_SIZE_MD, PICTURE_SIZES } from '@echo/ui/constants/picture-size'
import type { PictureSize } from '@echo/ui/types/picture-size'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { getBaseUrl } from '@echo/utils/helpers/get-base-url'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import type { ImageProps } from 'next/image'
import { concat, filter, isNil, length, lte, reduce } from 'ramda'

function getSize(width: number): Nullable<PictureSize> {
  const lteSizes: PictureSize[] = filter(lte(width), PICTURE_SIZES as unknown as PictureSize[])
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

export function addPictureSize(
  args: WithLoggerType<
    Partial<Omit<ImageProps, 'loader' | 'unoptimized' | 'src' | 'overrideSrc' | 'width'>> &
      Record<'src', Nullable<string>> &
      Record<'width', number>
  >
): string {
  const size = getSize(args.width)
  if (isNilOrEmpty(args.src) || isNil(size)) {
    if (!isNil(size) && size < PICTURE_SIZE_MD) {
      return 'https://storage.googleapis.com/echo-dev-public/not-found-nft-small.png?alt=media'
    }
    return 'https://storage.googleapis.com/echo-dev-public/not-found-nft.png?alt=media'
  }
  try {
    // our IPFS gateway
    if (args.src.startsWith(`${getBaseUrl()}/api/ipfs`)) {
      return concat(args.src, `?img-width=${size}`)
    }
    // NFT storage
    const nftStorageMatch = args.src.match(/^https:\/\/([^.]+)\.ipfs\.nftstorage\.link\/(.+)$/)
    if (!isNil(nftStorageMatch)) {
      const path1 = nftStorageMatch[1]
      const path2 = nftStorageMatch[2]
      if (!isNil(path1) && !isNil(path2)) {
        return apiUrlProvider.ipfs.proxy.getUrl({ path: `${path1}/${path2}?img-width=${size}` })
      }
    }
    // w3s
    const w3sMatch = args.src.match(/^https:\/\/([^.]+)\.ipfs\.w3s\.link\/(.+)$/)
    if (!isNil(w3sMatch)) {
      const path1 = w3sMatch[1]
      const path2 = w3sMatch[2]
      if (!isNil(path1) && !isNil(path2)) {
        return apiUrlProvider.ipfs.proxy.getUrl({ path: `${path1}/${path2}?img-width=${size}` })
      }
    }
    const urlObject = new URL(args.src)
    const hostname = urlObject.hostname
    // ipfs.io
    if (hostname.includes('ipfs.io')) {
      const match = urlObject.pathname.match(/ipfs\/([^/]+)\/?/)
      if (isNil(match) || length(match) < 2 || isNil(match[1])) {
        return args.src
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return `${apiUrlProvider.ipfs.proxy.getUrl({ path: match[1]! })}?img-width=${size}`
    }
    // discord
    if (hostname.includes('discordapp.com')) {
      return `${urlObject.href}?size=${size}`
    }
    // opensea
    if (hostname.includes('seadn.io')) {
      return `${urlObject.href}?w=${size}&auto=format`
    }
    // google buckets
    if (hostname.includes('googleusercontent.com')) {
      return `${urlObject.href}=s${size}`
    }
    // Alchemy CDN
    if (hostname.includes('nft-cdn.alchemy.com')) {
      return `https://res.cloudinary.com/alchemyapi/image/upload/w_${size}/scaled${urlObject.pathname}`
    }
    return args.src
  } catch (err) {
    args.logger?.error({ err, fn: addPictureSize.name })
    return args.src
  }
}
