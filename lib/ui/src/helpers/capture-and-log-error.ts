import { captureError } from '@echo/ui/helpers/capture-error'
import { getBaseLogger } from '@echo/utils/services/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { type SeverityLevel } from '@sentry/nextjs'
import { assoc, isNil } from 'ramda'

interface Options {
  message?: string
  logObject?: Record<string, unknown>
  severity?: Nullable<SeverityLevel>
}

export function captureAndLogError(err: Error, options?: Options) {
  const logger = getBaseLogger('ui')
  captureError(err, options?.severity)
  if (isNil(options)) {
    logger.error({ err })
  } else {
    const logObject = isNil(options.logObject) ? { err } : assoc('err', err, options.logObject)
    if (isNil(options.severity)) {
      logger.error(logObject, options.message)
    } else {
      switch (options.severity) {
        case 'error':
          logger.error(logObject, options.message)
          break
        case 'debug':
          logger.debug(logObject, options.message)
          break
        case 'warning':
          logger.warn(logObject, options.message)
          break
        case 'fatal':
          logger.fatal(logObject, options.message)
          break
        case 'log':
        case 'info':
          logger.info(logObject, options.message)
          break
      }
    }
  }
}
