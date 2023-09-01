import { ErrorResponse } from '../responses/error-response'
import { NextResponse } from 'next/server'

export type ApiResponse<T> = NextResponse<T | ErrorResponse>
