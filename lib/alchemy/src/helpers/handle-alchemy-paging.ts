import { type AlchemyPagingResult } from '@echo/alchemy/types/paging/alchemy-paging-result'
import { type ArgsWithPaging } from '@echo/alchemy/types/request/args-with-paging'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { assoc, concat } from 'ramda'

function handlePagingRecursive<Args extends object, Response>(
  fetcher: (args: ArgsWithPaging<Args>) => Promise<AlchemyPagingResult<Response>>,
  accumulatedData: Response[]
) {
  return async function (args: ArgsWithPaging<Args>): Promise<Response[]> {
    const response = await fetcher(args)
    const { data, pageKey: newPageKey } = response
    const mergedData = concat(data, accumulatedData)
    if (isNilOrEmpty(newPageKey)) {
      return mergedData
    }
    return handlePagingRecursive(fetcher, mergedData)(assoc('pageKey', newPageKey, args) as ArgsWithPaging<Args>)
  }
}

export function handleAlchemyPaging<Args extends object, Response>(
  fetcher: (args: ArgsWithPaging<Args>) => Promise<AlchemyPagingResult<Response>>
) {
  return function (args: ArgsWithPaging<Args>) {
    return handlePagingRecursive<Args, Response>(fetcher, [])(args)
  }
}
