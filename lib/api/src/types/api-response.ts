import { type ErrorResponse } from '@echo/utils/types/error-response'
import { NextResponse } from 'next/server'

export type ApiResponse<T> = NextResponse<T | ErrorResponse>
