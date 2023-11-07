import { type ErrorResponse } from '@echo/api/types/responses/error-response'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { NextResponse } from 'next/server'

export abstract class ApiError<T = ErrorResponse> extends Error {
  status: ErrorStatus

  protected constructor(status: ErrorStatus, message: string) {
    super(message)
    this.status = status
  }

  async beforeError(): Promise<void> {
    // this will be called before returning the error response
    // add code to subclasses when needed
  }

  getErrorResponse(): NextResponse<T> {
    return NextResponse.json(
      {
        error: errorMessage(this.message)
      } as T,
      { status: this.status }
    )
  }
}
