import { getApiUrl } from '../../config/get-api-url'

export enum ApiRoutes {
  NONCE = 'api/nonce',
  LOGIN = 'api/login',
  OFFER = 'api/offer',
  HAS_NFT = 'api/user/has-nft'
}

/**
 * Get the API route complete URL. Will append the API URL before the route
 * @param route The route
 */
export function getApiRouteUrl(route: ApiRoutes): string {
  return `${getApiUrl()}/${route}`
}
