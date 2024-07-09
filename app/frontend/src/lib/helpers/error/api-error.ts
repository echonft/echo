import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import type { Nullable } from '@echo/utils/types/nullable'
import type { SeverityLevel } from '@sentry/nextjs'
import { NextResponse } from 'next/server'

export interface ApiErrorArgs {
  status: ErrorStatus
  message: string
  err?: unknown
  severity?: SeverityLevel
}

export abstract class ApiError extends Error {
  status: ErrorStatus
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
