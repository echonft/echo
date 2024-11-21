import { apiRoutes } from '@echo/routing/constants/api-routes'
import { PictureSize } from '@echo/utils/constants/picture-size'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import type { ImageProps } from 'next/image'
import { filter, isNil, lte, reduce, values } from 'ramda'

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
    const ipfsMatch = /^(ipfs):\/\/(.+)$/i.exec(src)
    if (!isNil(ipfsMatch)) {
      const path = ipfsMatch[2]
      if (!isNil(path)) {
        return apiRoutes.ipfs.proxy.withQuery({ width: size }).getUrl({ path })
      }
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
    const urlObject = new URL(src)
    const hostname = urlObject.hostname
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
    return src
  } catch (_err) {
    return args.src
  }
}
