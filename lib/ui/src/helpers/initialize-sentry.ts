import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'
import { extraErrorDataIntegration } from '@sentry/browser'
import { init, isInitialized, replayIntegration } from '@sentry/react'

export function initializeSentry() {
  if (!isInitialized()) {
    init({
      enabled: nodeEnvironment() === NodeEnvironment.Production,
      dsn: 'https://90f90a5ace372a2805407eeeb7d7fc15@o4506149604098048.ingest.us.sentry.io/4506149609472000',
      integrations: [
        replayIntegration({
          // Additional Replay configuration goes in here, for example:
          maskAllText: true,
          blockAllMedia: true
        }),
        extraErrorDataIntegration()
      ],
      maxValueLength: 99999,
      replaysOnErrorSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      tracesSampleRate: 1
    })
  }
}
