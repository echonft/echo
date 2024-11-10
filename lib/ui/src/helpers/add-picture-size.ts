import { apiRoutes } from '@echo/routing/constants/api-routes'
import { PictureSize } from '@echo/ui/constants/picture-size'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import type { ImageProps } from 'next/image'
import { filter, isNil, length, lte, reduce, split, values } from 'ramda'

function getSize(width: number): Nullable<PictureSize> {
  const pictureSizes = values(PictureSize)
  const lteSizes: PictureSize[] = filter(lte(width), pictureSizes)
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
  args: Partial<Omit<ImageProps, 'loader' | 'unoptimized' | 'src' | 'overrideSrc' | 'width'>> &
    Record<'src', Nullable<string>> &
    Record<'width', number>
): string {
  const size = getSize(args.width)
  if (isNilOrEmpty(args.src) || isNil(size)) {
    if (!isNil(size) && size < PictureSize.MD) {
      return 'https://storage.googleapis.com/echo-dev-public/not-found-nft-small.png?alt=media'
    }
    return 'https://storage.googleapis.com/echo-dev-public/not-found-nft.png?alt=media'
  }
  try {
    const { src } = args
    // IPFS
    const splittedUrl = split('://', src)
    if (length(splittedUrl) === 1) {
      return `${apiRoutes.ipfs.proxy.getUrl({ path: src })}?img-width=${size}`
    }
    // NFT storage
    const nftStorageMatch = /^https:\/\/([^.]+)\.ipfs\.nftstorage\.link\/(.+)$/.exec(src)
    if (!isNil(nftStorageMatch)) {
      const path1 = nftStorageMatch[1]
      const path2 = nftStorageMatch[2]
      if (!isNil(path1) && !isNil(path2)) {
        return apiRoutes.ipfs.proxy.getUrl({ path: `${path1}/${path2}?img-width=${size}` })
      }
    }
    // w3s
    const w3sMatch = /^https:\/\/([^.]+)\.ipfs\.w3s\.link\/(.+)$/.exec(src)
    if (!isNil(w3sMatch)) {
      const path1 = w3sMatch[1]
      const path2 = w3sMatch[2]
      if (!isNil(path1) && !isNil(path2)) {
        return apiRoutes.ipfs.proxy.getUrl({ path: `${path1}/${path2}?img-width=${size}` })
      }
    }
    const urlObject = new URL(src)
    const hostname = urlObject.hostname
    // ipfs.io
    if (hostname.includes('ipfs.io')) {
      const match = /ipfs\/([^/]+)\/?/.exec(urlObject.pathname)
      if (isNil(match) || length(match) < 2 || isNil(match[1])) {
        return src
      }
      return `${apiRoutes.ipfs.proxy.getUrl({ path: match[1] })}?img-width=${size}`
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
    return src
  } catch (_err) {
    return args.src
  }
}
