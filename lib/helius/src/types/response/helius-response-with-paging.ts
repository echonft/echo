import type { JsonRpc } from '@echo/helius/types/json-rpc'
import type { ResultWithPaging } from '@echo/helius/types/response/result-with-paging'

export interface HeliusResponseWithPaging<Result> {
  jsonrpc: JsonRpc
  result: ResultWithPaging<Result>
}
