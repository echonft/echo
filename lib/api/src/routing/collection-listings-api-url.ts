import { apiBaseUrl } from '@echo/api/routing/api-base-url'
import { isEmpty } from 'ramda'

export function collectionListingsApiUrl(slug: string) {
  if (isEmpty(slug)) {
    throw Error('collection slug is required')
  }
  return new URL(`${apiBaseUrl()}/collection/${slug}/listings`)
}
