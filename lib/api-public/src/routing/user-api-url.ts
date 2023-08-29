import { apiBaseUrl } from './api-base-url'

export function userApiUrl(id: string) {
  return new URL(`${apiBaseUrl()}/user/${id}`)
}
