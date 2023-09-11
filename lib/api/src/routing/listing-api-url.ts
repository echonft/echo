import { apiBaseUrl } from '@echo-api/routing/api-base-url'
import { isEmpty } from 'ramda'

export function listingApiUrl(id: string) {
  if (isEmpty(id)) {
    throw Error('listing id is required')
  }
  return new URL(`${apiBaseUrl()}/listing/${id}`)
}
