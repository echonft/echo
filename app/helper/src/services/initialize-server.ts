import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { isCi } from '@echo/utils/constants/is-ci'
import { isProd } from '@echo/utils/constants/is-prod'
import { init } from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'

/**
 * Function to initialize anything needed on the server
 */
export function initializeServer() {
  init({
    dsn: 'https://3c218cae136c11a81754cc4749d2ae22@o4506149604098048.ingest.sentry.io/4506202719256576',
    enabled: !isCi && isProd,
    integrations: [new ProfilingIntegration()],
    profilesSampleRate: 1.0,
    tracesSampleRate: 1.0
  })
  initializeFirebase()
}
