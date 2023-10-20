import { type ApiRequest } from '@echo/api/types/api-request'
import { type ApiResponse } from '@echo/api/types/api-response'
import { type AuthOptions } from 'next-auth'

export type RestrictedRequestHandler<ResponseBody, RequestBody = never> = (
  req: ApiRequest<RequestBody>,
  authOptions: AuthOptions,
  ...args: never[]
) => Promise<ApiResponse<ResponseBody>>
