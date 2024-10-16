import type { WithAuthUserProps } from '@echo/auth/types/with-auth-user-props'
import type { NextRequest } from '@echo/backend/types/next-request'
import type { WithLogger } from '@echo/utils/types/with-logger'
import type { NextResponse } from 'next/server'

export interface AuthRequestHandlerArgs<RequestBody = never> extends WithLogger, WithAuthUserProps {
  req: NextRequest<RequestBody>
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
