import { logError } from '@echo/ui/helpers/log-error'
import type { Alert } from '@echo/ui/types/alert'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { getCurrentScope } from '@sentry/react'
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

function onError(args: OnErrorArgs) {
  const { alert, show, loggerContext, error } = args
  const user = getCurrentScope().getUser()
  const logObject = assoc('user', user, loggerContext ?? {})
  logError(error, {
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
