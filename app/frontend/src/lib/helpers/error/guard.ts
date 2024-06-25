import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { createError } from '@echo/frontend/lib/helpers/error/create-error'
import type { Logger } from '@echo/utils/types/logger'
import type { NonPromise } from '@echo/utils/types/non-promise'
import type { Nullable } from '@echo/utils/types/nullable'

interface BaseGuardArgs {
  status: ErrorStatus
  message?: string
  logger?: Nullable<Logger>
}

interface GuardFnArgs<TArgs extends unknown[], TResult> extends BaseGuardArgs {
  fn: (...args: TArgs) => NonPromise<TResult>
}

interface GuardAsyncFnArgs<TArgs extends unknown[], TResult> extends BaseGuardArgs {
  fn: (...args: TArgs) => Promise<TResult>
}

export function guardFn<TArgs extends unknown[], TResult>(args: GuardFnArgs<TArgs, TResult>) {
  const { fn, status, message, logger: baseLogger } = args
  const logger = baseLogger?.child({ fn: 'guardFn', parentFn: fn.name })
  return function (...args: TArgs) {
    try {
      return fn(...args)
    } catch (err) {
      logger?.error({ err })
      throw createError(status, message)
    }
  }
}

export function guardAsyncFn<TArgs extends unknown[], TResult>(args: GuardAsyncFnArgs<TArgs, TResult>) {
  const { fn, status, message, logger: baseLogger } = args
  const logger = baseLogger?.child({ fn: 'guardAsyncFn', parentFn: fn.name })
  return async function (...args: TArgs) {
    try {
      return await fn(...args)
    } catch (err) {
      logger?.error({ err })
      throw createError(status, message)
    }
  }
}
