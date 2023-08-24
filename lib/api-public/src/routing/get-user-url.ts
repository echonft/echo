import { getApiBaseUrl } from './get-api-base-url'

export const getUserUrl = (id: string) => `${getApiBaseUrl()}user/${id}`
