// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { isProd } from '@echo/utils/constants/is-prod'
import { ExtraErrorData } from '@sentry/integrations'
import { init, Replay } from '@sentry/nextjs'

init({
  debug: false,
  dsn: 'https://90f90a5ace372a2805407eeeb7d7fc15@o4506149604098048.ingest.sentry.io/4506149609472000',
  enabled: isProd,
  integrations: [
    new Replay({
      maskAllText: true,
      blockAllMedia: true
    }),
    new ExtraErrorData()
  ],
  replaysOnErrorSampleRate: 1.0,
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: isProd ? 0.1 : 1,
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1
})
