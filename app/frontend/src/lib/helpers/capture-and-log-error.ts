import { captureError } from '@echo/frontend/lib/helpers/capture-error'
import { getLogger } from '@echo/frontend/lib/helpers/get-logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { type SeverityLevel } from '@sentry/nextjs'
import { isNil } from 'ramda'

export function captureAndLogError(err: unknown, severity?: Nullable<SeverityLevel>) {
  const logger = getLogger()
  captureError(err, severity)
  if (isNil(severity)) {
    logger.error({ err })
  } else {
    switch (severity) {
      case 'error':
        logger.error({ err })
        break
      case 'debug':
        logger.debug({ err })
        break
      case 'warning':
        logger.warn({ err })
        break
      case 'fatal':
        logger.fatal({ err })
        break
      case 'log':
      case 'info':
        logger.info({ err })
        break
    }
  }
}
