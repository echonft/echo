import { apiBaseUrl } from './api-base-url'

export function offerApiUrl(id: string) {
  return new URL(`${apiBaseUrl()}/offer/${id}`)
}
