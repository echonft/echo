import { getServerConfig } from '../../config/get-server-config'

export enum ApiRoutes {
  NONCE = 'api/nonce',
  HAS_NFT = 'api/user/has-nft',
  GET_FIREBASE_TOKEN = 'api/auth/get-firebase-token'
}

/**
 * Get the API route complete URL. Will append the API URL before the route
 * @param route The route
 */
export function getApiRouteUrl(route: ApiRoutes): string {
  return `${getServerConfig().url}/${route}`
}
