import type { Alert } from '@echo/ui/types/alert'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { captureException } from '@sentry/nextjs'
import { always, assoc, isEmpty, isNil, pick, pipe, when } from 'ramda'

interface CaptureContext {
  contexts?: Record<string, Record<string, unknown> | undefined>
  tags?: Record<string, number | string | boolean | bigint | symbol | null | undefined>
}
export interface ErrorCallback extends CaptureContext {
  alert?: Alert
  show?: (alert: Alert) => unknown
  onError?: EmptyFunction
}
interface OnErrorArgs extends ErrorCallback {
  error: Error
}

function getCaptureContext(args: OnErrorArgs) {
  return pipe<[OnErrorArgs], CaptureContext, CaptureContext | undefined>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pick(['contexts', 'tags']),
    when(isEmpty, always(undefined))
  )(args) as CaptureContext | undefined
}

function onError(args: OnErrorArgs) {
  const { alert, show, onError, error } = args
  captureException(error, getCaptureContext(args))
  if (!isNil(show) && !isNil(alert)) {
    show(alert)
  }
  onError?.()
}

export function errorCallback(args?: ErrorCallback) {
  return function (err: Error) {
    onError(assoc('error', err, args ?? {}))
  }
}
