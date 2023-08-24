import { getApiBaseUrl } from './get-api-base-url'

export const getUserUrl = (id: string) => new URL(`${getApiBaseUrl()}/user/${id}`)
