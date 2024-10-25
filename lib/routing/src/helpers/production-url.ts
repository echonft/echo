import { productionHostname } from '@echo/routing/helpers/production-hostname'

export function productionUrl() {
  return `https://${productionHostname()}`
}
