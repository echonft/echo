import { ApiError, type ApiErrorArgs, ApiErrorStatus } from '@echo/backend/errors/api-error'
import type { OptionalRecord } from '@echo/utils/types/optional-record'
import type { SeverityLevel } from '@sentry/nextjs'
import { assoc, isNil, pipe, propOr } from 'ramda'

export class NotFoundError extends ApiError {
  constructor(args?: Omit<ApiErrorArgs, 'status' | 'message'> & OptionalRecord<'message', string>) {
    const status = ApiErrorStatus.NotFound
    const defaultMessage = 'Not Found'
    const defaultSeverity: SeverityLevel = 'warning'
    if (isNil(args)) {
      super({ status, message: defaultMessage })
    } else {
      const message = propOr<
        string,
        Omit<ApiErrorArgs, 'status' | 'message'> & OptionalRecord<'message', string>,
        string
      >(defaultMessage, 'message', args)
      const severity = propOr<
        SeverityLevel,
        Omit<ApiErrorArgs, 'status' | 'message'> & OptionalRecord<'message', string>,
        string
      >(defaultSeverity, 'severity', args)
      super(pipe(assoc('status', status), assoc('message', message), assoc('severity', severity))(args))
    }
  }
}
