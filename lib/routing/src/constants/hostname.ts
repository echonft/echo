import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'

export const hostname =
  nodeEnvironment === NodeEnvironment.Development || nodeEnvironment === NodeEnvironment.Test
    ? 'dev.echonft.xyz'
    : (process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL)
