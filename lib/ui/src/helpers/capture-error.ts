import { environment } from '@echo/utils/constants/environment'
import type { Nullable } from '@echo/utils/types/nullable'
import { captureException, type SeverityLevel } from '@sentry/nextjs'
import { assoc, isNil } from 'ramda'

export function captureError(err: unknown, severity?: Nullable<SeverityLevel>) {
  const baseHint = {
    tags: {
      app_environement: environment()
    }
  }
  const hint = isNil(severity) ? baseHint : assoc('level', severity, baseHint)
  captureException(err, hint)
}
