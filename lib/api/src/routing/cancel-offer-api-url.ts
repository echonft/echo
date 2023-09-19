import { apiBaseUrl } from '@echo/api/routing/api-base-url'
import { isEmpty } from 'ramda'

export function cancelOfferApiUrl(id: string) {
  if (isEmpty(id)) {
    throw Error('offer id is required')
  }
  return new URL(`${apiBaseUrl()}/offer/${id}/cancel`)
}
