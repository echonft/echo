import type { ErrorResponse } from '@echo/utils/types/error-response'
import type { Nullable } from '@echo/utils/types/nullable'
import type { SeverityLevel } from '@sentry/nextjs'
import { NextResponse } from 'next/server'

export enum ApiErrorStatus {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  ServerError = 500
}

export interface ApiErrorArgs {
  readonly status: ApiErrorStatus
  readonly message: string
  readonly err?: unknown
  readonly severity?: SeverityLevel
}

export abstract class ApiError extends Error {
  status: ApiErrorStatus
  error: unknown
  severity: Nullable<SeverityLevel>

  protected constructor(args: ApiErrorArgs) {
    super(args.message)
    this.status = args.status
    this.error = args.err
    this.severity = args.severity
  }
  getErrorResponse(): NextResponse<ErrorResponse> {
    return NextResponse.json<ErrorResponse>(
      {
        error: this.message
      },
      { status: this.status }
    )
  }
}
