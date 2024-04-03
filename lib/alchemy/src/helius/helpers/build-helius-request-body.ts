import type { ApiMethods } from '@echo/alchemy/helius/constants/api-methods'
import type { HeliusRequestBaseBody } from '@echo/alchemy/helius/types/request/helius-request-base-body'

export function buildHeliusRequestBody<T>(method: ApiMethods, params: T): HeliusRequestBaseBody<T> {
  return {
    jsonrpc: '2.0',
    // TODO We should probably randomize this?
    id: 'id',
    method,
    params
  }
}
