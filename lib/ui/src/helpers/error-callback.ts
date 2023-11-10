import type { Alert } from '@echo/ui/types/alert'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { captureException } from '@sentry/nextjs'
import { assoc, isNil } from 'ramda'

export interface ErrorCallback {
  contexts?: Record<string, Record<string, unknown> | undefined>
  alert?: Alert
  show?: (alert: Alert) => unknown
  onError?: EmptyFunction
}

export function onError(args: ErrorCallback & Record<'error', Error>) {
  const { contexts, alert, show, onError, error } = args
  captureException(
    error,
    isNil(contexts)
      ? undefined
      : {
          contexts
        }
  )
  if (!isNil(show) && !isNil(alert)) {
    show(alert)
  }
  onError?.()
}

export function errorCallback(args?: ErrorCallback) {
  return (err: Error) => {
    onError(assoc('error', err, args ?? {}))
  }
}
