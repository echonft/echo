import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { ApiError, type ApiErrorArgs } from '@echo/frontend/lib/helpers/error/api-error'
import type { OptionalRecord } from '@echo/utils/types/optional-record'
import { assoc, isNil, pipe, propOr } from 'ramda'

export class ForbiddenError extends ApiError {
  constructor(args?: Omit<ApiErrorArgs, 'status' | 'message'> & OptionalRecord<'message', string>) {
    const status = ErrorStatus.FORBIDDEN
    const defaultMessage = 'Forbidden'
    if (isNil(args)) {
      super({ status, message: defaultMessage })
    } else {
      const message = propOr<
        string,
        Omit<ApiErrorArgs, 'status' | 'message'> & OptionalRecord<'message', string>,
        string
      >(defaultMessage, 'message', args)
      super(pipe(assoc('status', status), assoc('message', message))(args))
    }
  }
}
