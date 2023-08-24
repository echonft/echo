import { join } from 'ramda'

export function getBearerToken(accessToken: string, tokenType: string) {
  return join(' ', [tokenType, accessToken])
}
