import { captureAndLogError } from '@echo/ui/helpers/capture-and-log-error'
import type { Alert } from '@echo/ui/types/alert'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { getCurrentScope } from '@sentry/nextjs'
import type { Logger } from 'pino'
import { assoc, isNil } from 'ramda'

export interface ErrorCallback {
  alert?: Alert
  logger?: Logger
  loggerContext?: Record<string, unknown>
  show?: (alert: Alert) => unknown
  onError?: EmptyFunction
}

interface OnErrorArgs extends ErrorCallback {
  error: unknown
  logger?: Logger
}

function onError(args: OnErrorArgs) {
  const { alert, show, logger, loggerContext, error } = args
  const user = getCurrentScope().getUser()
  const logObject = assoc('user', user, loggerContext ?? {})
  captureAndLogError(error, {
    logger,
    logObject,
    severity: 'warning'
  })
  if (!isNil(show) && !isNil(alert)) {
    show(alert)
  }
  args.onError?.()
}

export function errorCallback(args?: ErrorCallback) {
  return function (err: unknown) {
    onError(assoc('error', err, args ?? {}))
  }
}
