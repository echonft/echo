import type { ApiRequest, ApiResponse } from '@echo/api/types'

export type RequestHandler<ResponseBody, RequestBody = never> = (
  req: ApiRequest<RequestBody>,
  ...args: never[]
) => Promise<ApiResponse<ResponseBody>>
