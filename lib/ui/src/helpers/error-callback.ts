import type { Alert } from '@echo/ui/types/alert'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { getCurrentScope } from '@sentry/nextjs'
import { assoc, isNil, pipe } from 'ramda'

export interface ErrorCallback {
  alert?: Alert
  logger?: Nullable<Logger>
  loggerContext?: Record<string, unknown>
  show?: (alert: Alert) => unknown
  onError?: EmptyFunction
}

interface OnErrorArgs extends ErrorCallback {
  error: unknown
}

function onError(args: OnErrorArgs) {
  const { alert, show, onError, logger, loggerContext, error } = args
  const user = getCurrentScope().getUser()
  const loggerObject = isNil(loggerContext)
    ? { err: error, user }
    : pipe(assoc('err', error), assoc('user', user))(loggerContext)
  logger?.warn(loggerObject, 'handled error')
  if (!isNil(show) && !isNil(alert)) {
    show(alert)
  }
  onError?.()
}

export function errorCallback(args?: ErrorCallback) {
  return function (err: unknown) {
    onError(assoc('error', err, args ?? {}))
  }
}
