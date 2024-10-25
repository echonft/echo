import type { User } from '@echo/auth/types/user'
import type { NextRequest } from '@echo/backend/types/next-request'
import type { NextResponse } from 'next/server'

export interface AuthRequestHandlerArgs<RequestBody = never> {
  req: NextRequest<RequestBody>
  user: User
}

export interface AuthRequestHandlerArgsWithParams<Params extends object, RequestBody = never>
  extends AuthRequestHandlerArgs<RequestBody> {
  params: Params
}

export type AuthRequestHandler<ResponseBody, RequestBody = never> = (
  args: AuthRequestHandlerArgs<RequestBody>
) => Promise<NextResponse<ResponseBody>>

export type AuthRequestWithParamsHandler<ResponseBody, RequestBody = never, Params extends object = never> = (
  args: AuthRequestHandlerArgsWithParams<Params, RequestBody>
) => Promise<NextResponse<ResponseBody>>
