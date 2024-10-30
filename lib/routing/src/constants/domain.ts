import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'

export const domain =
  nodeEnvironment === NodeEnvironment.Development || nodeEnvironment === NodeEnvironment.Test
    ? 'localhost'
    : (process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL)
