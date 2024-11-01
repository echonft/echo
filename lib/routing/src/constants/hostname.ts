import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'

export function hostname() {
  const nodeEnv = nodeEnvironment()
  return nodeEnv === NodeEnvironment.Development || nodeEnv === NodeEnvironment.Test
    ? 'dev.echonft.xyz'
    : (process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL)
}
