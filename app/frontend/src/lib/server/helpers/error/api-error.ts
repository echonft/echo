import { ErrorResponse, ErrorStatus } from '@echo/api-public'
import { errorMessage } from '@echo/utils'
import { NextResponse } from 'next/server'

export abstract class ApiError extends Error {
  status: ErrorStatus
  protected constructor(status: ErrorStatus, message: string) {
    super(message)
    this.status = status
  }

  getErrorResponse(): NextResponse<ErrorResponse> {
    return NextResponse.json(
      {
        error: errorMessage(this.message)
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { status: this.status }
    )
  }
}
