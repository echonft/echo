import { isCi } from '@echo/utils/constants/is-ci'
import { isProd } from '@echo/utils/constants/is-prod'
import { init } from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

export function initializeSentry() {
  init({
    dsn: 'https://3b3f89c8f90990e4b35f5e194d109300@o4506149604098048.ingest.us.sentry.io/4506185901932544',
    enabled: !isCi && isProd,
    integrations: [nodeProfilingIntegration()],
    profilesSampleRate: 1.0,
    tracesSampleRate: 1.0
  })
}
