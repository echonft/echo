import { apiBaseUrl } from './api-base-url'
import { isEmpty } from 'ramda'

export function userListingsUrl(id: string) {
  if (isEmpty(id)) {
    throw Error('user id is required')
  }
  return new URL(`${apiBaseUrl()}/user/${id}/listings`)
}
