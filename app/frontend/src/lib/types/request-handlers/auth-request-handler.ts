import type { ApiRequest } from '@echo/api/types/api-request'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { NextResponse } from 'next/server'

export type AuthRequestHandler<RequestBody, ResponseBody, Params extends Record<string, unknown> = never> = (
  user: AuthUser,
  request: ApiRequest<RequestBody>,
  ...params: Params[]
) => Promise<NextResponse<ResponseBody>>
