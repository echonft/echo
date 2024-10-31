import { hostname } from '@echo/routing/constants/hostname'
import { productionHostname } from '@echo/routing/constants/production-hostname'
import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'
import { VercelEnvironment, vercelEnvironment } from '@echo/utils/constants/vercel-environment'

export const baseUrl =
  nodeEnvironment === NodeEnvironment.Development || nodeEnvironment === NodeEnvironment.Test
    ? 'http://localhost:3000'
    : vercelEnvironment === VercelEnvironment.Preview
      ? `https://${hostname}`
      : `https://${productionHostname}`
