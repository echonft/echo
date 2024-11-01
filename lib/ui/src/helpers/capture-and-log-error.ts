import { captureError } from '@echo/ui/helpers/capture-error'
import { logError } from '@echo/ui/helpers/log-error'
import type { Nullable } from '@echo/utils/types/nullable'
import { type SeverityLevel } from '@sentry/nextjs'

interface Options {
  message?: string
  logObject?: Record<string, unknown>
  severity?: Nullable<SeverityLevel>
}

export function captureAndLogError(err: unknown, options?: Options) {
  captureError(err, options?.severity)
  logError(err, options)
}
