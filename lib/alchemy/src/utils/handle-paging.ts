import { PagingResult } from '../types/paging/paging-result'
import { RequestWithPaging } from '../types/request/request-with-paging'
import { concat, isNil } from 'ramda'

const handlePagingRecursive = <I extends RequestWithPaging, O>(
  fetcher: (_args: I) => Promise<PagingResult<O>>,
  args: I,
  values: O[]
): Promise<O[]> =>
  fetcher(args).then((response) => {
    const { data, pageKey: newPageKey } = response
    if (isNil(newPageKey)) {
      return concat(data, values)
    }
    return handlePagingRecursive(fetcher, { ...args, pageKey: newPageKey }, concat(data, values))
  })

export const handlePaging = <I extends RequestWithPaging, O>(
  fetcher: (_args: I) => Promise<PagingResult<O>>,
  args: I
) => handlePagingRecursive<I, O>(fetcher, args, [])
