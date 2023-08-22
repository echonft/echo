import { getApiBaseUrl } from './get-api-base-url'

export const getCreateListingUrl = () => new URL(`${getApiBaseUrl()}/create/listing`)
