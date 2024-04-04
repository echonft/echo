// import type { ApiMethods } from '@echo/helius/constants/api-methods'
// import type { HeliusRequest } from '@echo/helius/types/request/params/base/helius-request'
// import type { WithPagingParams } from '@echo/helius/types/request/params/base/with-paging-params'
// import type { WithPagingResponse } from '@echo/helius/types/response/base/with-paging-response'
// import { assoc, concat, has, inc, type MergeArrays, modify, pipe, prop, unless } from 'ramda'
//
// function handlePagingRecursive<
//   Args extends WithPagingParams,
//   AccKey extends keyof Omit<Response, keyof WithPagingResponse>,
//   Response extends WithPagingResponse & Record<AccKey, Response[AccKey]> & Record<AccKey, Array<unknown>>
// >(
//   fetcher: (args: Args) => Promise<Response>,
//   accumulatorKey: AccKey,
//   accumulatedData: Response[AccKey]
// ) {
//   return async function (args: Args): Promise<Response[AccKey]> {
//     const response = await fetcher(args)
//     if (response.total > response.limit) {
//       const newAccumulatedData:Response[AccKey] = pipe(prop(accumulatorKey), concat(accumulatedData))(response)
//
//       return handlePagingRecursive<Args,AccKey, Response>(fetcher, accumulatorKey, )(modify('page', inc,args))
//     }
//     return accumulatedData
//   }
// }
//
// export function handleHeliusPaging<
//   Args extends WithPagingParams,
//   Params extends WithPagingParams,
//   Request extends HeliusRequest<Params, ApiMethods>,
//   AccKey extends keyof Omit<Response, keyof WithPagingResponse>,
//   Response extends Record<AccKey, Response[AccKey]> & WithPagingResponse
// >(args: Args, accKey: AccKey) {
//   return function (fetcher: (request: Request) => Promise<Response) {
//     return pipe<[Args], Args, Args, Promise<Response>>(
//       assoc('page', 1),
//       unless(has('limit'), assoc('limit', 1000)),
//       handlePagingRecursive<Args, Response, AccKey>(fetcher, accKey, [])
//     )(args)
//   }
// }
