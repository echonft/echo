import { ApiError, type ApiErrorArgs, ApiErrorStatus } from '@echo/backend/errors/api-error'
import type { OptionalRecord } from '@echo/utils/types/optional-record'
import { assoc, isNil, pipe, propOr } from 'ramda'

export class UnauthorizedError extends ApiError {
  constructor(args?: Omit<ApiErrorArgs, 'status' | 'message'> & OptionalRecord<'message', string>) {
    const status = ApiErrorStatus.Unauthorized
    const defaultMessage = 'Unauthorized'
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
