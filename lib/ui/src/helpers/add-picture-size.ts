import { apiRoutes } from '@echo/routing/constants/api-routes'
import { isNil } from 'ramda'

function getSize(width: number): number {
  if (width <= 0) {
    return 1
  }
  width--
  width |= width >> 1
  width |= width >> 2
  width |= width >> 4
  width |= width >> 8
  width |= width >> 16
  return width + 1
}

export function addPictureSize(src: string, width: number): string {
  const size = getSize(width)
  try {
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
    return src
  }
}
