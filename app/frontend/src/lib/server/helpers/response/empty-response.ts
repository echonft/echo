import { type EmptyResponse } from '@echo/api/types/responses/empty-response'
import { NextResponse } from 'next/server'

export function emptyResponse() {
  return NextResponse.json<EmptyResponse>({})
}
