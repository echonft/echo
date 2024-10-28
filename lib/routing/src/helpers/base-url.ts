import { productionHostname } from '@echo/routing/constants/production-hostname'
import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'
import { VercelEnvironment, vercelEnvironment } from '@echo/utils/constants/vercel-environment'

export function baseUrl() {
  if (nodeEnvironment === NodeEnvironment.Development || nodeEnvironment === NodeEnvironment.Test) {
    return 'http://localhost:3000'
  }
  if (vercelEnvironment === VercelEnvironment.Preview) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }
  return `https://${productionHostname}`
}
