import { type ApiResponse } from '@echo/api/types/api-response'

export type RequestHandler<TArgs extends unknown[], TResponseBody> = (
  ...args: TArgs
) => Promise<ApiResponse<TResponseBody>>
