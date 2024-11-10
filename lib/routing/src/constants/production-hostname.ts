import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'
import { VercelEnvironment, vercelEnvironment } from '@echo/utils/constants/vercel-environment'

export function productionHostname() {
  const nodeEnv = nodeEnvironment()
  return nodeEnv === NodeEnvironment.Development || nodeEnv === NodeEnvironment.Test
    ? 'dev.echonft.xyz'
    : vercelEnvironment() === VercelEnvironment.Preview
      ? (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL)
      : (process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL)
}
