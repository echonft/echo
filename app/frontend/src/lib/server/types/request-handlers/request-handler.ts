import type { NextResponse } from 'next/server'

export type RequestHandler<TArgs extends unknown[], TResponseBody> = (
  ...args: TArgs
) => Promise<NextResponse<TResponseBody>>
