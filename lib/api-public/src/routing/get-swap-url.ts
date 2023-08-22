import { getApiBaseUrl } from './get-api-base-url'

export const getSwapUrl = (id: string) => new URL(`${getApiBaseUrl()}/swap/${id}`)
