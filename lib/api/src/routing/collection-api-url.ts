import { apiBaseUrl } from './api-base-url'
import { isEmpty } from 'ramda'

export function collectionApiUrl(slug: string) {
  if (isEmpty(slug)) {
    throw Error('collection slug is required')
  }
  return new URL(`${apiBaseUrl()}/collection/${slug}`)
}
