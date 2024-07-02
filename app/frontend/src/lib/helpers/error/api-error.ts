import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import type { Nullable } from '@echo/utils/types/nullable'
import { NextResponse } from 'next/server'

export abstract class ApiError extends Error {
  status: ErrorStatus
  error: Nullable<Error>

  protected constructor(status: ErrorStatus, message: string, error?: Error) {
    super(message)
    this.status = status
    this.error = error
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
