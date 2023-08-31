import { ApiRequest, ApiResponse } from '@echo/api-public'

export type RequestHandler<ResponseBody, RequestBody = never> = (
  req: ApiRequest<RequestBody>,
  ...args: never[]
) => Promise<ApiResponse<ResponseBody>>
