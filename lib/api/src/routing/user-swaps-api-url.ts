import { apiBaseUrl } from './api-base-url'
import { isEmpty } from 'ramda'

export function userSwapsApiUrl(username: string) {
  if (isEmpty(username)) {
    throw Error('username is required')
  }
  return new URL(`${apiBaseUrl()}/user/${username}/swaps`)
}
