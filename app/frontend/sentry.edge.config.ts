// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { isCi } from '@echo/utils/constants/is-ci'
import { isProd } from '@echo/utils/constants/is-prod'
import { ExtraErrorData } from '@sentry/integrations'
import { init } from '@sentry/nextjs'

init({
  debug: false,
  dsn: 'https://90f90a5ace372a2805407eeeb7d7fc15@o4506149604098048.ingest.sentry.io/4506149609472000',
  enabled: !isCi && isProd,
  integrations: [new ExtraErrorData()],
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1
})
