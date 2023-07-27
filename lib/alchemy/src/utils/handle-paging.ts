import { PagingResult } from '../types/paging/paging-result'
import { RequestWithPaging } from '../types/request/request-with-paging'
import { R } from '@mobily/ts-belt'
import { concat, isNil } from 'ramda'

const handlePagingRecursive = <I extends RequestWithPaging, O>(
  fetcher: (_args: I) => Promise<R.Result<PagingResult<O>, Error>>,
  args: I,
  values: O[]
): Promise<R.Result<O[], Error>> =>
  fetcher(args).then((result) => {
    if (R.isOk(result)) {
      const { data, pageKey: newPageKey } = R.getExn(result)
      if (isNil(newPageKey)) {
        return R.fromExecution(() => concat(data, values))
      }
      return handlePagingRecursive(fetcher, { ...args, pageKey: newPageKey }, concat(data, values))
    }
    return result
  })

export const handlePaging = <I extends RequestWithPaging, O>(
  fetcher: (_args: I) => Promise<R.Result<PagingResult<O>, Error>>,
  args: I
) => handlePagingRecursive(fetcher, args, [])
