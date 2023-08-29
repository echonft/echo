import { ApiRequest, ApiResponse } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export type RequestHandler<T, Q extends Record<string, string | string[]>, U> = (
  req: ApiRequest<T, Q>,
  res: ApiResponse<U>,
  authOptions?: AuthOptions
) => Promise<void>
