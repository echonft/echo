import { getApiBaseUrl } from './get-api-base-url'

export const getSwapUrl = (id: string) => `${getApiBaseUrl()}swap/${id}`
