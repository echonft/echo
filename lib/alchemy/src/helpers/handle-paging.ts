import { PagingResult } from '../types/paging/paging-result'
import { RequestWithPaging } from '../types/request/request-with-paging'
import { concat, isNil } from 'ramda'

async function handlePagingRecursive<I extends RequestWithPaging, O>(
  fetcher: (_args: I) => Promise<PagingResult<O>>,
  args: I,
  values: O[]
): Promise<O[]> {
  const response = await fetcher(args)
  const { data, pageKey: newPageKey } = response
  if (isNil(newPageKey)) {
    return concat(data, values)
  }
  return handlePagingRecursive(fetcher, { ...args, pageKey: newPageKey }, concat(data, values))
}

export function handlePaging<I extends RequestWithPaging, O>(fetcher: (_args: I) => Promise<PagingResult<O>>, args: I) {
  return handlePagingRecursive<I, O>(fetcher, args, [])
}
