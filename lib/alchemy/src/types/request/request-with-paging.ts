import { FetcherData } from '@echo/utils'

export interface RequestWithPaging extends FetcherData {
  pageKey?: string
  pageSize?: number // max 100
}
