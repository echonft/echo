import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { ApiResponse } from '@echo/api/types/base/api-response'

export type RequestHandler<ResponseBody, RequestBody = never> = (
  req: ApiRequest<RequestBody>,
  ...args: never[]
) => Promise<ApiResponse<ResponseBody>>
