import { getApiBaseUrl } from './get-api-base-url'

export const getCreateOfferUrl = () => new URL(`${getApiBaseUrl()}/create/offer`)
