import { apiBaseUrl } from './api-base-url'
import { isEmpty } from 'ramda'

export function offerApiUrl(id: string) {
  if (isEmpty(id)) {
    throw Error('offer id is required')
  }
  return new URL(`${apiBaseUrl()}/offer/${id}`)
}
