// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { isCI } from '@echo/utils/constants/is-ci'
import { VercelEnvironment, vercelEnvironment } from '@echo/utils/constants/vercel-environment'
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  enabled: !isCI && vercelEnvironment === VercelEnvironment.Production,
  dsn: 'https://90f90a5ace372a2805407eeeb7d7fc15@o4506149604098048.ingest.us.sentry.io/4506149609472000',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false
  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
})
