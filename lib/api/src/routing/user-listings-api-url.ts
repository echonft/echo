import { apiBaseUrl } from '@echo-api/routing/api-base-url'
import { isEmpty } from 'ramda'

export function userListingsApiUrl(username: string) {
  if (isEmpty(username)) {
    throw Error('username is required')
  }
  return new URL(`${apiBaseUrl()}/user/${username}/listings`)
}
