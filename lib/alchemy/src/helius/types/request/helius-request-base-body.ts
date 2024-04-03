import type { ApiMethods } from '@echo/alchemy/helius/constants/api-methods'

export interface HeliusRequestBaseBody<T> {
  jsonrpc: string
  id: string
  method: ApiMethods
  params: T
}
