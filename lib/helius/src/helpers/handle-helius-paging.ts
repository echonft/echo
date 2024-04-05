import type { WithPagingParams } from '@echo/helius/types/request/params/with-paging-params'
import type { HeliusResponseWithPaging } from '@echo/helius/types/response/helius-response-with-paging'
import type { ResultWithPaging } from '@echo/helius/types/response/result-with-paging'
import { assoc, concat, inc, modify, pipe, prop } from 'ramda'

function handlePagingRecursive<Args extends WithPagingParams, Result>(
  fetcher: (args: Args) => Promise<HeliusResponseWithPaging<Result>>,
  accKey: keyof ResultWithPaging<Result>,
  accData: Result[]
) {
  return async function (args: Args): Promise<Result[]> {
    const response = await fetcher(args)
    const { result } = response
    const newAccumulatedData = pipe<[ResultWithPaging<Result>], Result[], Result[]>(
      prop(accKey),
      concat<Result>(accData)
    )(result)
    if (result.total === result.limit) {
      return handlePagingRecursive<Args, Result>(fetcher, accKey, newAccumulatedData)(modify('page', inc, args) as Args)
    }
    return newAccumulatedData
  }
}

export function handleHeliusPaging<Args, Result>(
  fetcher: (args: Args & WithPagingParams) => Promise<HeliusResponseWithPaging<Result>>,
  accKey: keyof ResultWithPaging<Result>
) {
  return function (args: Args) {
    return pipe<[Args], Args & Record<'page', number>, Args & WithPagingParams, Promise<Result[]>>(
      assoc('page', 1) as (args: Args) => Args & Record<'page', number>,
      assoc('limit', 1000) as (args: Args) => Args & WithPagingParams,
      handlePagingRecursive<Args & WithPagingParams, Result>(fetcher, accKey, [])
    )(args)
  }
}
