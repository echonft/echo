import type { ApiRequest } from '@echo/api/types/api-request'

export interface RequestParams<T extends Partial<Record<string, unknown>>> {
  request: ApiRequest<unknown>
  params: T
}
