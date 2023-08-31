import { ErrorResponse } from '@echo/api-public'
import { errorMessage } from '@echo/utils'
import { NextResponse } from 'next/server'

export abstract class ApiError extends Error {
  status: number
  protected constructor(status: number, message: string) {
    super(message)
    this.status = status
  }

  getErrorResponse(): NextResponse<ErrorResponse> {
    return NextResponse.json(
      {
        error: errorMessage(this.message)
      },
      { status: this.status }
    )
  }
}
