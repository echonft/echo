import type { PagingRequest } from '@echo/opensea/types/paging/paging-request'
import type { Key } from '@echo/utils/types/key-type'

export interface PagingArgs<K extends Key> extends PagingRequest {
  prop: K
}
