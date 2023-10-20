import { type AlchemyPagingResult } from '@echo/alchemy/types/paging/alchemy-paging-result'
import { type AlchemyRequestWithPaging } from '@echo/alchemy/types/request/alchemy-request-with-paging'
import { concat, isNil } from 'ramda'

async function handlePagingRecursive<I extends AlchemyRequestWithPaging, O>(
  fetcher: (_args: I) => Promise<AlchemyPagingResult<O>>,
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

export function handleAlchemyPaging<I extends AlchemyRequestWithPaging, O>(
  fetcher: (_args: I) => Promise<AlchemyPagingResult<O>>,
  args: I
) {
  return handlePagingRecursive<I, O>(fetcher, args, [])
}
