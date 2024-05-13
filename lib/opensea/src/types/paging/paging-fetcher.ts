import type { PagingRequest } from '@echo/opensea/types/paging/paging-request'
import type { PagingResponse } from '@echo/opensea/types/paging/paging-response'
import type { Key } from '@echo/utils/types/key-type'

export type PagingFetcher<Args extends PagingRequest, Response, K extends Key> = (
  args: Args
) => Promise<PagingResponse<Response, K>>
