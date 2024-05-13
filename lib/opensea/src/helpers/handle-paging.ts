import type { PagingFetcher } from '@echo/opensea/types/paging/paging-fetcher'
import type { PagingRequest } from '@echo/opensea/types/paging/paging-request'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Key } from '@echo/utils/types/key-type'
import { assoc, concat, prop } from 'ramda'

async function handlePagingRecursive<Args extends PagingRequest, Response, K extends Key>(
  fetcher: PagingFetcher<Args, Response, K>,
  propKey: K,
  args: Args,
  accumulatedData: Response[]
): Promise<Response[]> {
  const response = await fetcher(args)
  const { next } = response
  const data = prop(propKey, response)
  const mergedResponse = concat(data, accumulatedData)
  if (isNilOrEmpty(next)) {
    return mergedResponse
  }
  return handlePagingRecursive(fetcher, propKey, assoc('next', next, args) as Args, mergedResponse)
}

export function handlePaging<Args extends PagingRequest, Response, K extends Key>(
  fetcher: PagingFetcher<Args, Response, K>,
  propKey: K,
  args: Args
) {
  return handlePagingRecursive<Args, Response, K>(fetcher, propKey, args, [])
}
