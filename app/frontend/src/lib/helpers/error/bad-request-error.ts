import { ApiError, type ApiErrorArgs, ApiErrorStatus } from '@echo/frontend/lib/helpers/error/api-error'
import type { OptionalRecord } from '@echo/utils/types/optional-record'
import { assoc, isNil, pipe, propOr } from 'ramda'

export class BadRequestError extends ApiError {
  constructor(args?: Omit<ApiErrorArgs, 'status' | 'message'> & OptionalRecord<'message', string>) {
    const status = ApiErrorStatus.BadRequest
    const defaultMessage = 'Bad Request'
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
