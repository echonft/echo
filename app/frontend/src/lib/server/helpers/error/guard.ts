import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { createError } from '@echo/frontend/lib/server/helpers/error/create-error'
import { captureException } from '@sentry/nextjs'

type SeverityLevel = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug'
type NonPromise<T> = T extends Promise<unknown> ? never : T

function getSeverity(status: ErrorStatus) {
  switch (status) {
    case ErrorStatus.BAD_REQUEST:
    case ErrorStatus.UNAUTHORIZED:
    case ErrorStatus.FORBIDDEN:
      return 'log'
    case ErrorStatus.NOT_FOUND:
      return 'debug'
    case ErrorStatus.SERVER_ERROR:
      return 'error'
  }
}

export function guardFn<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => NonPromise<TResult>,
  status: ErrorStatus,
  severity?: SeverityLevel,
  message?: string
) {
  return function (...args: TArgs) {
    try {
      return fn(...args)
    } catch (e) {
      captureException(e, { level: severity ?? getSeverity(status) })
      throw createError(status, message)
    }
  }
}

export function guardAsyncFn<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  status: ErrorStatus,
  severity?: SeverityLevel,
  message?: string
) {
  return async function (...args: TArgs) {
    try {
      return await fn(...args)
    } catch (e) {
      captureException(e, { level: severity ?? getSeverity(status) })
      throw createError(status, message)
    }
  }
}
