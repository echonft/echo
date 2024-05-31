import { isURI } from '@echo/utils/helpers/is-uri'

export function cleanIpfsURI(uri: string): string {
  if (isURI(uri)) {
    return uri
  }
  return `ipfs://${uri}`
}
