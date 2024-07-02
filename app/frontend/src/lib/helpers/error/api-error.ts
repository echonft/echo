import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import { NextResponse } from 'next/server'

export abstract class ApiError extends Error {
  status: ErrorStatus

  protected constructor(status: ErrorStatus, message: string) {
    super(message)
    this.status = status
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
