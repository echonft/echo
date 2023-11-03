// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { ExtraErrorData } from '@sentry/integrations'
import { init } from '@sentry/nextjs'

init({
  debug: false,
  dsn: 'https://90f90a5ace372a2805407eeeb7d7fc15@o4506149604098048.ingest.sentry.io/4506149609472000',
  ignoreErrors: ['Dynamic server usage', 'CancelOfferError', 'NEXT_REDIRECT'],
  integrations: [new ExtraErrorData()],
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1
})
