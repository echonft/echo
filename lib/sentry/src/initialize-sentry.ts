import { isCi } from '@echo/utils/constants/is-ci'
import { isProd } from '@echo/utils/constants/is-prod'
import { init } from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'

export function initializeSentry(dsn: string) {
  init({
    dsn,
    enabled: !isCi && isProd,
    integrations: [new ProfilingIntegration()],
    profilesSampleRate: 1.0,
    tracesSampleRate: 1.0
  })
}
