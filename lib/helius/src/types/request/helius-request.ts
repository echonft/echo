import type { ApiMethods } from '@echo/helius/constants/api-methods'
import type { JsonRpc } from '@echo/helius/types/json-rpc'

export interface HeliusRequest<T, U extends ApiMethods> {
  jsonrpc: JsonRpc
  id: string
  method: U
  params: T
}
