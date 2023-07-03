import { getBaseUrl } from './get-base-url'
import { AlchemyV3Routes } from './routes'

export const getRoute = (route: AlchemyV3Routes): string => `${getBaseUrl()}${route}`
