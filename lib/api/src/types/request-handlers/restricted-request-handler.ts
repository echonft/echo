import { ApiRequest, ApiResponse } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export type RestrictedRequestHandler<ResponseBody, RequestBody = never> = (
  req: ApiRequest<RequestBody>,
  authOptions: AuthOptions,
  ...args: never[]
) => Promise<ApiResponse<ResponseBody>>
