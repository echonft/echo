import type { ApiRequest } from '@echo/api/types/api-request'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'

export function guarded_getResquestBody<T>(request: ApiRequest<T>) {
  try {
    return request.json()
  } catch (e) {
    throw new ServerError('error getting request body', e)
  }
}
