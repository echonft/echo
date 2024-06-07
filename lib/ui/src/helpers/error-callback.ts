import type { Alert } from '@echo/ui/types/alert'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { captureException, getCurrentScope, withScope } from '@sentry/nextjs'
import { assoc, isNil, mapObjIndexed } from 'ramda'

interface CaptureContext {
  contexts?: Record<string, Record<string, unknown> | null>
  tags?: Record<string, number | string | boolean | bigint | symbol | null | undefined>
}
export interface ErrorCallback extends CaptureContext {
  alert?: Alert
  show?: (alert: Alert) => unknown
  onError?: EmptyFunction
}
interface OnErrorArgs extends ErrorCallback {
  error: unknown
}
function onError(args: OnErrorArgs) {
  const { alert, show, onError, error } = args
  const user = getCurrentScope().getUser()
  withScope((scope) => {
    scope.setUser(isNil(user) ? null : user)
    const { tags, contexts } = args
    if (!isNil(tags)) {
      scope.setTags(tags)
    }
    if (!isNil(contexts)) {
      mapObjIndexed((context, name) => {
        scope.setContext(name, context)
      }, contexts)
    }
    captureException(error)
  })
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
