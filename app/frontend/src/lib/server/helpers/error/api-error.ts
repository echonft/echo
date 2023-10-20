import { type ErrorResponse } from '@echo/api/types/responses/error-response'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { NextResponse } from 'next/server'
import { assoc, isNil, pick } from 'ramda'

type ApiErrorLogLevel = 'error' | 'warn' | 'debug'
export abstract class ApiError extends Error {
  status: ErrorStatus
  protected caughtError: Error | undefined
  protected logLevel: ApiErrorLogLevel

  protected constructor(status: ErrorStatus, message: string, error?: unknown, logLevel?: ApiErrorLogLevel) {
    super(message)
    this.status = status
    this.caughtError = isNil(error) ? undefined : (error as Error)
    this.logLevel = logLevel ?? 'error'
  }

  logError() {
    let logObject = {
      status: this.status,
      message: this.message,
      cause: this.cause,
      stack: this.stack
    }
    if (!isNil(this.caughtError)) {
      logObject = assoc('originalError', pick(['name', 'message', 'cause', 'stack'], this.caughtError), logObject)
    }
    const logMessage = `API error: ${JSON.stringify(logObject)}`
    if (this.logLevel === 'error') {
      logger.error(logMessage)
    } else if (this.logLevel === 'warn') {
      logger.warn(logMessage)
    } else {
      logger.debug(logMessage)
    }
  }

  getErrorResponse(): NextResponse<ErrorResponse> {
    this.logError()
    return NextResponse.json(
      {
        error: errorMessage(this.message)
      },
      { status: this.status }
    )
  }
}
