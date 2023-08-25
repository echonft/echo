import { ApiRequest, ApiResponse } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export type RestrictedRequestHandler<
  T,
  Q extends Partial<{
    [key: string]: string | string[]
  }>,
  U
> = (req: ApiRequest<T, Q>, res: ApiResponse<U>, authOptions: AuthOptions) => Promise<void>
