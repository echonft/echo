import type { NextRequest } from '@echo/backend/types/next-request'
import type { WithLogger } from '@echo/utils/types/with-logger'
import type { NextResponse } from 'next/server'

export interface RequestHandlerArgs<RequestBody = never> extends WithLogger {
  req: NextRequest<RequestBody>
}

export interface RequestHandlerArgsWithParams<Params extends object, RequestBody = never>
  extends RequestHandlerArgs<RequestBody> {
  params: Params
}

export type RequestHandler<ResponseBody, RequestBody = never> = (
  args: RequestHandlerArgs<RequestBody>
) => Promise<NextResponse<ResponseBody>>

export type RequestWithParamsHandler<ResponseBody, RequestBody = never, Params extends object = never> = (
  args: RequestHandlerArgsWithParams<Params, RequestBody>
) => Promise<NextResponse<ResponseBody>>
