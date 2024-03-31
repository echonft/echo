import type { PictureSize } from '@echo/ui/types/picture-size'
import { isDev } from '@echo/utils/constants/is-dev'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, last, pipe, prop, split } from 'ramda'

export function addPictureSizeToUrl<T extends Nullable<string>>(url: T, size: PictureSize): T {
  if (isNil(url)) {
    return url
  }
  // for backward compatibility
  const urlObject = new URL(removeQueryFromUrl(url!))
  const hostname = urlObject.hostname
  if (hostname.includes('discordapp.com')) {
    return `${urlObject.href}?size=${size}` as T
  }
  if (hostname.includes('seadn.io')) {
    return `${urlObject.href}?w=${size}&auto=format` as T
  }
  if (hostname.includes('googleusercontent.com')) {
    return `${urlObject.href}=s${size}` as T
  }
  if (hostname.includes('nft-cdn.alchemy.com')) {
    return `https://res.cloudinary.com/alchemyapi/image/upload/w_${size}/scaled${urlObject.pathname}` as T
  }
  if (hostname.includes('ipfs.io')) {
    const id = pipe<[URL], string, string[], string>(prop('href'), split('/'), last)(urlObject)
    const url = `https://beige-quick-seahorse-333.mypinata.cloud/ipfs/${id}?img-width=${size}`
    if (isDev) {
      return `${url}&pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY}` as T
    }
    return url as T
  }
  return url
}
