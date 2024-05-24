import type { ApiRequest } from '@echo/api/types/api-request'
import type { NextResponse } from 'next/server'

export type RequestHandler<RequestBody, ResponseBody, Params extends object = never> = (
  request: ApiRequest<RequestBody>,
  ...params: Params[]
) => Promise<NextResponse<ResponseBody>>
