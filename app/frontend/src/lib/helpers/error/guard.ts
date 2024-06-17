import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { createError } from '@echo/frontend/lib/helpers/error/create-error'
import { isDev } from '@echo/utils/constants/is-dev'
import type { Logger } from '@echo/utils/types/logger'
import type { NonPromise } from '@echo/utils/types/non-promise'
import type { Nullable } from '@echo/utils/types/nullable'
import { captureException } from '@sentry/nextjs'

type SeverityLevel = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug'

interface BaseGuardArgs {
  status: ErrorStatus
  severity?: SeverityLevel
  message?: string
  logger?: Nullable<Logger>
}

interface GuardFnArgs<TArgs extends unknown[], TResult> extends BaseGuardArgs {
  fn: (...args: TArgs) => NonPromise<TResult>
}

interface GuardAsyncFnArgs<TArgs extends unknown[], TResult> extends BaseGuardArgs {
  fn: (...args: TArgs) => Promise<TResult>
}

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

export function guardFn<TArgs extends unknown[], TResult>(args: GuardFnArgs<TArgs, TResult>) {
  const { fn, status, severity, message, logger: baseLogger } = args
  const logger = baseLogger?.child({ fn: 'guardFn', parentFn: fn.name })
  return function (...args: TArgs) {
    try {
      return fn(...args)
    } catch (err) {
      if (isDev) {
        logger?.error({ err })
      }
      captureException(err, { level: severity ?? getSeverity(status) })
      throw createError(status, message)
    }
  }
}

export function guardAsyncFn<TArgs extends unknown[], TResult>(args: GuardAsyncFnArgs<TArgs, TResult>) {
  const { fn, status, severity, message, logger: baseLogger } = args
  const logger = baseLogger?.child({ fn: 'guardAsyncFn', parentFn: fn.name })
  return async function (...args: TArgs) {
    try {
      return await fn(...args)
    } catch (err) {
      if (isDev) {
        logger?.error({ err })
      }
      captureException(err, { level: severity ?? getSeverity(status) })
      throw createError(status, message)
    }
  }
}
