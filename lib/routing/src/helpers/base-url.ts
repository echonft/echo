import { domain } from '@echo/routing/constants/domain'
import { productionDomain } from '@echo/routing/constants/production-domain'
import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'
import { VercelEnvironment, vercelEnvironment } from '@echo/utils/constants/vercel-environment'

export function baseUrl() {
  if (nodeEnvironment === NodeEnvironment.Development || nodeEnvironment === NodeEnvironment.Test) {
    return `http://${domain}:3000`
  }
  if (vercelEnvironment === VercelEnvironment.Preview) {
    return `https://${domain}`
  }
  return `https://${productionDomain}`
}
