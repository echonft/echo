// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
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
})
