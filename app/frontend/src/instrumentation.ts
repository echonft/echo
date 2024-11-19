// noinspection JSUnusedGlobalSymbols

import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'
import { init } from '@sentry/nextjs'

export function register() {
  init({
    enabled: nodeEnvironment() === NodeEnvironment.Production,
    dsn: 'https://90f90a5ace372a2805407eeeb7d7fc15@o4506149604098048.ingest.us.sentry.io/4506149609472000',
    tracesSampleRate: 1
  })
}
