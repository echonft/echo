import { hostname } from '@echo/routing/constants/hostname'
import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'
import { VercelEnvironment, vercelEnvironment } from '@echo/utils/constants/vercel-environment'

export function baseUrl() {
  const nodeEnv = nodeEnvironment()
  return nodeEnv === NodeEnvironment.Development || nodeEnv === NodeEnvironment.Test
    ? 'http://localhost:3000'
    : vercelEnvironment() === VercelEnvironment.Preview
      ? `https://${hostname()}`
      : `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
}
