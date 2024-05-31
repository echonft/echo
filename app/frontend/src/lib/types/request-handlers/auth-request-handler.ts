import type { ApiRequest } from '@echo/api/types/api-request'
import type { NextResponse } from 'next/server'
import type { User } from 'next-auth'

export type AuthRequestHandler<RequestBody, ResponseBody, Params extends object = never> = (
  user: User,
  request: ApiRequest<RequestBody>,
  ...params: Params[]
) => Promise<NextResponse<ResponseBody>>
