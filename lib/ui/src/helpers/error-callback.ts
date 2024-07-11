import { captureAndLogError } from '@echo/ui/helpers/capture-and-log-error'
import type { Alert } from '@echo/ui/types/alert'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { getCurrentScope } from '@sentry/nextjs'
import { assoc, isNil } from 'ramda'

export interface ErrorCallback {
  alert?: Alert
  loggerContext?: Record<string, unknown>
  show?: (alert: Alert) => unknown
  onError?: EmptyFunction
}

interface OnErrorArgs extends ErrorCallback {
  error: unknown
}

function onError(args: WithLoggerType<OnErrorArgs>) {
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

export function errorCallback(args?: WithLoggerType<ErrorCallback>) {
  return function (err: unknown) {
    onError(assoc('error', err, args ?? {}))
  }
}
