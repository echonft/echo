import type { PictureSize } from '@echo/ui/types/picture-size'
import { isDev } from '@echo/utils/constants/is-dev'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function addPictureSizeToUrl(url: Nullable<string>, size: PictureSize): string {
  if (isNil(url)) {
    return ''
  }
  try {
    // for backward compatibility
    const urlObject = new URL(removeQueryFromUrl(url))
    if (urlObject.protocol == 'ipfs:') {
      const url = `https://pinata.echonft.xyz/ipfs/${urlObject.pathname.slice(2)}?img-width=${size}`
      if (isDev) {
        return `${url}&pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY}`
      }
      return url
    }
    const hostname = urlObject.hostname
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
    if (hostname.includes('ipfs.io')) {
      const match = urlObject.pathname.match(/ipfs\/([^/]+)\/?/)
      if (match) {
        const url = `https://pinata.echonft.xyz/ipfs/${match[1]}?img-width=${size}`
        if (isDev) {
          return `${url}&pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY}`
        }
        return url
      }
    }
    return url
  } catch (err) {
    pinoLogger.error(`addPictureSizeToUrl error: ${errorMessage(err)}`)
    return url
  }
}
