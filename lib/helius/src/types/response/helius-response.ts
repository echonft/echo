import type { JsonRpc } from '@echo/helius/types/json-rpc'

export interface HeliusResponse<T> {
  jsonrpc: JsonRpc
  result: T
}
